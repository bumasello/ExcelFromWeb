import express from "express";
import qualiRouter from "./Route/qualiRouter.js";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use("/qualidade", qualiRouter.router);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname + "/public" });
});

app.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});

app.listen(3333, () => console.log("API Started"));
