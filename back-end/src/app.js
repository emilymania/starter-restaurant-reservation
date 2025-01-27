const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const dashboardRouter = require("./dashboard/dashboard.router");

const app = express();
app.use(express.json());


app.use(cors());
app.use(morgan('combined'));

app.use("/reservations", reservationsRouter);
app.use("/dashboard", dashboardRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
