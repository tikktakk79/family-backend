#!/usr/bin/env node
//added test comment
// server.js
import express from "express"
//import "babel-polyfill"
import "core-js/stable"
import "regenerator-runtime/runtime"
const cors = require("cors")

import UserWithDb from "./usingDB/controllers/users"
import Article from "./usingDB/controllers/article"
import getData from "./usingDb/controllers/getdata.js"

const app = express()

const User = UserWithDb

let allowed

console.log("Value of NODE_ENV", process.env.NODE_ENV)

if (process.env.NODE_ENV === "development") {
  console.log("NODE_ENV development")
  allowed = ["http://localhost:8080"]
} else {
  console.log("NODE_ENV production")
  allowed = ["", ""]
}

let corsOptions = {
  origin: allowed
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(express.json({extended: true}))
app.use(express.urlencoded({ extended: true, limit: '4mb' }))

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "YAY! Congratulations! Your first endpoint is working" })
})

app.post("/api/setpass", User.setPassword)
app.post("/api/login", User.loginUser)
app.post("/api/addarticle", Article.addArticle)
app.post("/api/editarticle", Article.editArticle)
app.get("/api/getarticles", Article.getArticles)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`)
  //logger.info("App is up and running")
})

