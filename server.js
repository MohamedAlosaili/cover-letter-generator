import path from "path";
import { config } from "dotenv";
config();

import express from "express";
import inputs from "./inputs.js";
import errorHandler from "./errorHandler.js";
import ErrorResponse from "./utils/ErrorResponse.js";
import fetchOpenAIAPI from "./utils/fetchOpenAIAPI.js";
import { createParser } from "eventsource-parser";

const app = express();
app.use(express.json());

app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index", { inputs });
});

app.post("/api/generate", async (req, res, next) => {
  const { userInfo, apiKey } = req.body;

  try {
    const response = await fetchOpenAIAPI(userInfo, apiKey);
    const onParse = event => {
      if (event.type === "event") {
        if (!event.data) return;
        const data = event.data;
        if (data === "[DONE]") {
          return res.end();
        }

        const text = JSON.parse(data).choices[0].delta?.content ?? "";
        res.write(text);

        if (res.writableStarted === undefined) {
          res.writableStarted = true;
        }
      }
    };

    const parser = createParser(onParse);
    const decoder = new TextDecoder();
    for await (const chunk of response.body) {
      parser.feed(decoder.decode(chunk));
    }
  } catch (err) {
    if (res.writableStarted && !res.writableEnded) {
      return res.end();
    }
    next(new ErrorResponse(err.message, err.statusCode));
  }
});

app.use("*", (req, res, next) => {
  next(new ErrorResponse("Not found", 404));
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);

process.on("unhandledRejection", error => {
  console.log(`${error.stack}`.red);

  server.close(() => process.exit(1));
});
