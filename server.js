#!/usr/bin/env node
//added test comment
// server.js
import express from "express"
//import "babel-polyfill"
import "core-js/stable"
import "regenerator-runtime/runtime"
const cors = require("cors")

import UserWithDb from "./usingDb/controllers/users"
import Article from "./usingDb/controllers/article"
import getData from "./usingDb/controllers/getdata.js"
import Auth from "./usingDb/middleware/Auth"

const app = express()

const User = UserWithDb

let allowed

console.log("Value of NODE_ENV", process.env.NODE_ENV)

if (process.env.NODE_ENV === "development") {
  console.log("NODE_ENV development")
  allowed = ["http://localhost:8080"]
} else {
  console.log("NODE_ENV production")
  allowed = ["https://sjoburger.com", "http://sjoburger.com"]
}

let corsOptions = {
  origin: allowed
}

app.use(cors(corsOptions))
app.use(express.json({extended: true}))
app.use(express.urlencoded({ extended: true, limit: '4mb' }))

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "YAY! Congratulations! Your first endpoint is working" })
})

app.post("/api/login", User.loginUser)
app.post("/api/createuser", Auth.verifyToken, User.createUser)
app.post("/api/addarticle", Auth.verifyToken, Article.addArticle)
app.post("/api/editarticle", Auth.verifyToken, Article.editArticle)
app.get("/api/getarticles", Auth.verifyToken, Article.getArticles)
app.get("/api/getstorytags", Auth.verifyToken, Article.getStoryTags)
app.get("/api/gettaglinks", Auth.verifyToken, Article.getTagLinks)
app.get("/api/getcategories", Auth.verifyToken, Article.getCategories)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`)
  //logger.info("App is up and running")
})

