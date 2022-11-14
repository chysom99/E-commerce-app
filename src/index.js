const express = require("express");
const app = express();
const routes = require("../src/api/routes/index");

require("../src/models/index");

app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on " + (process.env.PORT || 3000));
});
