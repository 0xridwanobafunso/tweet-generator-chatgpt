import Express from "express";
import { generateTweets } from "./controller/tweets";
import path from "path";

const app = Express();

// serve static files
app.use(Express.static("public"));

// parse req.body
app.use(Express.json());

// views
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/index.html"));
});
app.get("/result", function (req, res) {
  res.sendFile(path.join(__dirname, "/view/result.html"));
});

// api
app.post("/generate-tweets", generateTweets);

// start server
app.listen(3000, () => {
  console.log("App running on http://127.0.0.1:3000");
});
