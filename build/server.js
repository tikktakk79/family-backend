#!/usr/bin/env node
//added test comment
// server.js
"use strict";

var _express = _interopRequireDefault(require("express"));
require("core-js/stable");
require("regenerator-runtime/runtime");
var _users = _interopRequireDefault(require("./usingDB/controllers/users"));
var _getdata = _interopRequireDefault(require("./usingDb/controllers/getdata.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//import "babel-polyfill"
var cors = require("cors");
var app = (0, _express["default"])();
var User = _users["default"];
var allowed;
console.log("Value of NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  console.log("NODE_ENV development");
  allowed = ["http://localhost:8080"];
} else {
  console.log("NODE_ENV production");
  allowed = ["", ""];
}
var corsOptions = {
  origin: allowed
};
app.use(_express["default"].json());
app.use(cors(corsOptions));
app.get("/", function (req, res) {
  return res.status(200).send({
    message: "YAY! Congratulations! Your first endpoint is working"
  });
});
app.post("/api/setpass", User.setPassword);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Our app is running on port ".concat(PORT));
  //logger.info("App is up and running")
});