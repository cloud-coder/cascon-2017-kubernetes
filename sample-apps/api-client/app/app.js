const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");

const app = express();
const routes = require("./routes");
const middleware = require("./routes/generic-middleware");

// security
app.use(helmet());

// parse json body, and set it to req.body
app.use(bodyParser.json({type: "*/*"})); // for parsing application/json

// parse form body
// app.use(bodyParser.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded

// parse Cookie header and set req.cookies
app.use(cookieParser());

// application level middleware - the order or routes matter
app.use(middleware.timeLogger);

// using regEx for get/post/..., this is similar to app.use middleware, but app.use covers all requests
app.all("*", middleware.logger);

app.use("/pub", express.static(path.join(__dirname, "public")));

app.use(routes);

// add multiple error handler and choose which one to handle or continue with the next
app.use(middleware.errorLogger);
app.use(middleware.error500);

app.use(middleware.error404);

app.listen(3081, function () {
	console.log("app is listening at http://localhost:3081...")
});