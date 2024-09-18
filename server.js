#!/usr/bin/env node
//added test comment
// server.js
"use strict";

const path = require("path");
import express from "express"
require("core-js/stable");
require("regenerator-runtime/runtime");
var _users = _interopRequireDefault(require("./usingDb/controllers/users"));
var _article = _interopRequireDefault(require("./usingDb/controllers/article"));
var _getdata = _interopRequireDefault(require("./usingDb/controllers/getdata.js"));
var _Auth = _interopRequireDefault(require("./usingDb/middleware/Auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//import "babel-polyfill"
var cors = require("cors");
var app = express();
var User = _users["default"];
var allowed;
var multer =require("multer")

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
  if(!allowedTypes.includes(file.mimetype)) {
    const error = new Error("incorrect file")
    error.code = "INCORRECT_FILETYPE"
    return cb(error, false)
  }
  cb(null, true)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../uploads')
  }
})

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 20000000
  }
})


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
app.use(express.json({
  extended: true,
  limit: '10mb'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));
app.use(express({limit: '50mb'}));
app.use(express.static(path.join(__dirname,'../public')))
app.get("/", function (req, res) {
  return res.status(200).send({
    message: "YAY! Congratulations! Your first endpoint is working"
  });
});
app.post("/api/login", User.loginUser);
app.post("/api/createuser", _Auth["default"].verifyToken, User.createUser);
app.post("/api/changepassword", _Auth["default"].verifyToken, User.changePassword);
app.post("/api/addarticle", _Auth["default"].verifyToken, _article["default"].addArticle);
app.post("/api/editarticle", _Auth["default"].verifyToken, _article["default"].editArticle);
app.post("/api/deletearticle", _Auth["default"].verifyToken, _article["default"].deleteArticle);
app.post("/api/removepermanently", _Auth["default"].verifyToken, _article["default"].removePermanently);
app.get("/api/getarticles", _Auth["default"].verifyToken, _article["default"].getArticles);
app.get("/api/getstorytags", _Auth["default"].verifyToken, _article["default"].getStoryTags);
app.get("/api/removeemptytags", _Auth["default"].verifyToken, _article["default"].removeEmptyTags);
app.get("/api/gettaglinks", _Auth["default"].verifyToken, _article["default"].getTagLinks);
app.get("/api/getcategories", _Auth["default"].verifyToken, _article["default"].getCategories);
app.get("/api/getuserlevel", _Auth["default"].verifyToken, User.getUserLevel);
app.post("/api/uploadimage", [_Auth["default"].verifyToken, upload.single('file')], _article["default"].uploadImage);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Our app is running on port ".concat(PORT));
  //logger.info("App is up and running")
});