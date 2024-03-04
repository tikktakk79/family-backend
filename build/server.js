#!/usr/bin/env node
//added test comment
// server.js
"use strict";

var _express = _interopRequireDefault(require("express"));
require("core-js/stable");
require("regenerator-runtime/runtime");
var _users = _interopRequireDefault(require("./usingDb/controllers/users"));
var _article = _interopRequireDefault(require("./usingDb/controllers/article"));
var _getdata = _interopRequireDefault(require("./usingDb/controllers/getdata.js"));
var _Auth = _interopRequireDefault(require("./usingDb/middleware/Auth"));
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
  allowed = ["https://sjoburger.com", "http://sjoburger.com"];
}
var corsOptions = {
  origin: allowed
};
app.use(cors(corsOptions));
app.use(_express["default"].json({
  extended: true
}));
app.use(_express["default"].urlencoded({
  extended: true,
  limit: '4mb'
}));
app.get("/", function (req, res) {
  return res.status(200).send({
    message: "YAY! Congratulations! Your first endpoint is working"
  });
});
app.post("/api/login", User.loginUser);
app.post("/api/createuser", _Auth["default"].verifyToken, User.createUser);
app.post("/api/addarticle", _Auth["default"].verifyToken, _article["default"].addArticle);
app.post("/api/editarticle", _Auth["default"].verifyToken, _article["default"].editArticle);
app.post("/api/deletearticle", _Auth["default"].verifyToken, _article["default"].deleteArticle);
app.post("/api/removepermanently", _Auth["default"].verifyToken, _article["default"].removePermanently);
app.get("/api/getarticles", _Auth["default"].verifyToken, _article["default"].getArticles);
app.get("/api/getstorytags", _Auth["default"].verifyToken, _article["default"].getStoryTags);
app.get("/api/gettaglinks", _Auth["default"].verifyToken, _article["default"].getTagLinks);
app.get("/api/getcategories", _Auth["default"].verifyToken, _article["default"].getCategories);
app.get("/api/getuserlevel", _Auth["default"].verifyToken, User.getUserLevel);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Our app is running on port ".concat(PORT));
  //logger.info("App is up and running")
});