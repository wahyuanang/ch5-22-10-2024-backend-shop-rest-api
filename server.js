require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const router = require("./routes");
const docsRouter = require("./routes/documentationRouter");
const { systemController } = require("./controllers");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.get("/api/v1/health-check", systemController.healtcheck);
app.use("/api/v1", router);
app.use("/api-docs", docsRouter);
app.use(systemController.onLost);

module.exports = app;
