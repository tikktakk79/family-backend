import moment from "moment"
import db from "../db"
import helper from "./helper.js"


const Article = {
  async addArticle(req, res) {
    console.log("Running addArticle")
    let mySQLCreated = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    let createQuery = `
      INSERT INTO article (heading, story, category, year_event, created, created_by)
      VALUES (?,?,?,?,?,?);
    `
    console.log("created", mySQLCreated)
    const values = [req.body.heading, req.body.story, req.body.category, req.body.year, mySQLCreated, req.user.username]

    try {
      await db.query(createQuery, values)
      return res.status(201).end()
    } catch (error) {
      console.log("Error in addArticle", error)
      return res.status(400).send(error)
    }
  },
  async editArticle(req, res) {
    let mySQLUpdated = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    console.log("Running editArticle")
    console.log("req.body", req.body)
    let tags = req.body.tags
    console.log("tags", tags)

    if (tags) {
      console.log("Needs to update tags", tags)
      Article.editTags(req.body.id, tags)
    }

   let createQuery = `
      UPDATE article 
      SET 
        heading = ?,
        story = ?,
        category = ?,
        year_event = ?,
        updated = ?,
        updated_by = ?
      WHERE
        id = ?;
     `
  
    const values = [req.body.heading, req.body.story, req.body.category, req.body.year, mySQLUpdated, req.user.username, req.body.id]

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

  async editTags (articleId, tags) {
    console.log("articleId", articleId)
    console.log("tags", tags)
    let tagQuery = `
      SELECT * FROM tag
      `

    let tagArticleQuery = `
      SELECT tag.id, tag.tag_name 
      FROM tag
      JOIN article_tag 
      ON article_tag.tag_id = tag.id
      WHERE article_tag.article_id = ?
      ;
    `

    const allTags = await db.query(tagQuery)
    const oldTags = await db.query(tagArticleQuery, [articleId])
    console.log("oldTags", oldTags)
    console.log("allTags", allTags)

    let newTags = []
    let existingTags = []
    let tagsRemove = []
    
    for (const i in tags) {
      console.log("tag", tags[i])
      let tagHits = oldTags.filter( 
        x => x.tag_name.toLowerCase() === tags[i].text.toLowerCase()
      )

      if (tagHits.length > 0) {
        existingTags.push(tags[i])
      } else {
        newTags.push(tags[i])
      }
    }

    console.log("oldTags", oldTags)
    
    for (const q in oldTags) {
      let noTags = existingTags.filter(
        t => t.text.toLowerCase() === oldTags[q].tag_name.toLowerCase()
      )

      if (noTags < 1) {
        tagsRemove.push(oldTags[q])
      }
    }

    console.log("tagsRemove", tagsRemove)

    let newTableTags = []
    let tagsFound = []

    for (const i in allTags) {
      let hits = (newTags.filter(q => q.text.toLowerCase() === allTags[i].tag_name.toLowerCase()))
      console.log("hits", hits)
      if (hits.length > 0 ) {
        tagsFound.push(hits[0])
      }
      
      newTableTags = newTags.filter(tag => !tagsFound.includes(tag))
    }

    console.log("newTableTags", newTableTags)

    this.removeTags(tagsRemove, articleId)
  
    this.insertTags(newTableTags, newTags, articleId)

    console.log("tagsFound", tagsFound)
    console.log("newTableTags", newTableTags)
    console.log("newTags", newTags)
    console.log("existingTags", existingTags)
  },

  async getStoryTags(req, res) {
    let createQuery = `
      SELECT * from tag;
    `
    try {
      const rows  = await db.query(createQuery)

      // console.log("Rows from getStoryTags", rows)

      return res.status(200).send(rows)
    } catch (error) {
      console.log("Error in getStoryTags", error)
      return res.status(400).send(error)
    }
  },

  async getTagLinks(req, res) {
    let createQuery = `
      SELECT * from article_tag;
    `
    try {
      const rows  = await db.query(createQuery)

      // console.log("Rows from getTagLinks", rows)

      return res.status(200).send(rows)
    } catch (error) {
      console.log("Error in getTagLinks", error)
      return res.status(400).send(error)
    }
  },

  async insertTags (newTableTags, newTags, articleId) {
    const queryInsert = `
      INSERT INTO tag (tag_name)
      VALUES (?)
      ;
    `

    const queryFind = `
      SELECT * FROM tag 
      WHERE 
        tag_name = ?
      LIMIT 1
      ;
      `

    const queryInsertTagLink = `
      INSERT INTO article_tag (article_id, tag_id)
      VALUES (?, ?)
    `

    for (const q in newTableTags) {
      await db.query(queryInsert, [newTableTags[q].text])
    }

    console.log("newTags", newTags)

    let dbNewTags = []
    for (const j in newTags) {
      let tag = await db.query(queryFind, [newTags[j].text])
      console.log("tag from newTags", tag)
      dbNewTags.push(tag[0])
    }

    console.log("dbNewTags", dbNewTags)

    for (const s in dbNewTags) {
      console.log("dbNewTags[s]", dbNewTags[s])
      await db.query(queryInsertTagLink, [articleId, dbNewTags[s].id])
    }

    console.log("dbNewTags", dbNewTags)
  },
  async removeTags(tagsRemove, articleId) {

    const queryRemoveTags = `
      DELETE FROM article_tag
      WHERE 
        article_id = ?
      AND
        tag_id = ?
    `
    const findArticleTags = `
      SELECT * FROM article_tag
      WHERE tag_id = ?
    `

    const deleteTag = `
      DELETE FROM TAG WHERE id = ?
    `

    for (const i in tagsRemove) {
      await db.query(queryRemoveTags, [articleId, tagsRemove[i].id])
      let remainingTags = await db.query(findArticleTags, [tagsRemove[i].id])
      console.log("remainingTags", remainingTags)

      if (remainingTags.length < 1) {
        await db.query(deleteTag, [tagsRemove[i].id])
      }
    }
  },
  async getCategories(req, res) {
    const createQuery = `SELECT * FROM category`

    try {
      const rows  = await db.query(createQuery)

      return res.status(200).send(rows)
    } catch (error) {
      console.log("Error in getCategories", error)
      return res.status(400).send(error)
    }
  }
}

export default Article
