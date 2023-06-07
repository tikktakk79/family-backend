import db from "../db"
import helper from "./helper.js"


const Article = {
  async addArticle(req, res) {
    console.log("Running addArticle")
    let createQuery = `
      INSERT INTO article (heading, story, category, year_event)
      VALUES (?,?,?,?);
    `
  
    const values = [req.body.heading, req.body.story, req.body.category, req.body.year]

    try {
      await db.query(createQuery, values)
      return res.status(201).end()
    } catch (error) {
      console.log("Error in addArticle", error)
      return res.status(400).send(error)
    }
  },
  async editArticle(req, res) {
    console.log("Running editArticle")
    console.log("req.body", req.body)
    let tags = req.body.tags
    console.log("tags", tags)

    if (tags) {
      console.log("Needs to update tags", tags)
    }

   let createQuery = `
      UPDATE article 
      SET 
        heading = ?,
        story = ?,
        category = ?,
        year_event = ?
      WHERE
        id = ?;
     `
  
    const values = [req.body.heading, req.body.story, req.body.category, req.body.year, req.body.id]

    try {
      await db.query(createQuery, values)
      return res.status(201).end()
    } catch (error) {
      console.log("Error in addArticle", error)
      return res.status(400).send(error)
    }
  },
  
  async getArticles(req, res) {
    let createQuery = `
      SELECT * from article;
    `
    try {
      const rows  = await db.query(createQuery)

      // console.log("Rows from getArticle", rows)

      // console.log("rows", rows)
      return res.status(200).send(rows)
    } catch (error) {
      console.log("Error in getArticles", error)
      return res.status(400).send(error)
    }
  },
  async addTag (articleId, tags) {
    console.log("articleId", articleId)
    console.log("tags", tags)
    let queryCheckTag = `
      SELECT * FROM tag
      WHERE tag_name = ?
      `
    let existingTags = []
    let newTags = []
    
    for (tag in tags) {
      const values = []
      return
    }
  }

  
}

export default Article
