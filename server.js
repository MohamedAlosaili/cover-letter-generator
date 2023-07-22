import path from "path";
import { config } from "dotenv";
config();

import express from "express";
import inputs from "./inputs.js";
import errorHandler from "./errorHandler.js";

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { inputs });
});

app.post("/api/generate", (req, res) => {
  console.log(req.body);

  res.send("Ok");
});

app.use("*", (req, res, next) => {
  req.status = 404;
  req.message = "Not found";

  next(new Error());
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
