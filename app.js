require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const app = express();

require("./config/db.config");

app.use(express.json());

/** Routes */
const routes = require("./config/routes.config");
app.use(routes);

/** Error Handling */
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

app.use((error, req, res, next) => {
  if (!error.status) {
    error = createError(500, error);
  }

  if (error.status >= 500) {
    console.error(error);
  }

  const data = {};
  data.message = error.message;

  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((errors, key) => {
      errors[key] = error.errors[key].message;
      return errors;
    }, {});
  }
  res.status(error.status).json(data);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.info(`Application running at port ${port}`);
});
