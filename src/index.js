const express = require("express");
const bodyParser = require("body-parser");
const { ValidationError } = require("express-validation");

const app = express();
const routes = require("../src/api/routes/index");

require("../src/models/index");

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1/", routes);

app.use(function (err, req, res, next) {
  console.log(err);
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json(err.details.body.map((x) => x.message));
  }
  return res.status(500).json(err);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on " + (process.env.PORT || 3000));
});
