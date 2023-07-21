import path from "path";
import { config } from "dotenv";
config();

import express from "express";

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));

app.post("/api/generate", (req, res) => {
  console.log(req.body);

  res.send("Ok");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
