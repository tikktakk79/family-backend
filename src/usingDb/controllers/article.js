import moment from "moment"
import db from "../db"
import helper from "./helper.js"


const Article = {
  async addArticle(req, res) {
    console.log("Running addArticle")
    let tags = req.body.tags
    let mySQLCreated = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    let createQuery = `
      INSERT INTO article (heading, story, category, year_event, created, created_by)
      VALUES (?,?,?,?,?,?);
    `
    
    let idQuery = `SELECT MAX(id) from article;`
    console.log("created", mySQLCreated)
    const values = [req.body.heading, req.body.story, req.body.category, req.body.year, mySQLCreated, req.user.username]

    try {
      let result = await db.query(createQuery, values)
      console.log("RESULT", result)
      let insertId = await db.query(idQuery)
      if (tags) {
        console.log("Needs to update tags", tags)
        console.log("insertId", insertId)
        let lastId = insertId[0]['MAX(id)']
        console.log("lastId", lastId)
        Article.editTags(lastId, tags)
      }

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

  async deleteArticle(req, res) {
    let mySQLDeleted = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    console.log("Running deleteArticle")
    console.log("req.body", req.body)
    let articleId = req.body.id


   let createQuery = `
      UPDATE article 
      SET 
        removed = ?
      WHERE
        id = ?;
     `
  
    const values = [mySQLDeleted, articleId]

    try {
      await db.query(createQuery, values)
      return res.status(201).end()
    } catch (error) {
      console.log("Error in deleteArticle", error)
      return res.status(400).send(error)
    }
  },

  async removePermanently(req, res) {
    let articleIds = req.body.ids.join(",")

    let tagArticleQuery = `
      DELETE from article_tag
      WHERE
        article_id IN (?)
    `

    let createQuery = `
      DELETE from article
      WHERE
        removed 
      AND
        id IN (?)
    `

    const values = [articleIds]
  
    try {
      await db.query(tagArticleQuery, values)
      await db.query(createQuery, values)
      return res.status(201).end()
    } catch (error) {
      console.log("Error in removePermanently", error)
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
    }

    newTableTags = newTags.filter(tag => !tagsFound.includes(tag))
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

      let rows = await db.query(createQuery)
      return res.status(200).send(rows)
    } catch (error) {
      console.log("Error in getStoryTags", error)
      return res.status(400).send(error)
    }
  },

  async removeEmptyTags(req, res) {
    let removeTagsQuery = `
      DELETE FROM tag 
      WHERE    
        id in (?)
      `

    let emptyTagsQuery = `
      SELECT id FROM tag 
      WHERE tag.id NOT IN (
        SELECT tag.id FROM tag INNER JOIN article_tag atag ON atag.tag_id = tag.id
      );
    `
    
    let tagIds = []

    try {
      tagIds = await db.query(emptyTagsQuery)
      let idsRemove = tagIds.map(e=> e.id)
      console.log("idsRemove", idsRemove)
      if (idsRemove.length) {
        await db.query(removeTagsQuery, [idsRemove])
      }
    } catch (error) {
      console.log("Error inremoveEmptyTags", error)
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
        console.log("Running SQL to remove tag")
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
