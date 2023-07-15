import db from "../db"
import helper from "./helper.js"
import jwt from "jsonwebtoken"
const dotenv = require("dotenv")
var path = require('path');

dotenv.config("../../../.env")

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async createUser(req, res) {
    console.log("Entering create function")
    if (!req.body.password || !req.body.username || !req.body.email) {
      return res.status(400).send({ message: "Alla fält är inte ifyllda" })
    }

    const hashPassword = helper.hashPassword(req.body.password)

    const createQuery = `INSERT INTO
      user (firstname, lastname, username,  email, passwd)
      VALUES (?, ?, ?, ?, ?)
      `
    // const token = helper.generateToken(rows[0].username)
    // req.session.token = token
    // return res.status(201).send({ token })

    let chosenProtocol = "https"

    let host = req.get("host")

    if (host.includes("localhost")) {
      chosenProtocol = "http"
    }
  
    let baseUrl = chosenProtocol + "://" + req.get("host")

    //const secretCode = helper.createVerificationToken(req.body.email);

    //console.log("secret Code", secretCode);

    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.username,
      req.body.email,
      hashPassword
    ]

    try {
      console.log("Before create query in db")
      await db.query(createQuery, values)
      console.log("After create query")
    } catch (error) {
      console.log("ERROR in register", error)
      console.log("error routine", error.code);
      console.log("Användarnamnet är upptaget");
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(400).send({message: "Username taken"})
      }
      console.log("Something failed and I don't know what!")
      return res.status(400).send(error)
    }
  },
  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async loginUser(req, res) {
    console.log("HEj fron loginUser, proc env", process.env.NODE_ENV, )
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: "Alla fält är inte ifyllda" })
    }
    console.log("1We got to here!")
    const createQuery = "SELECT * FROM user WHERE username = ?"
  
    try {
      console.log("2We got to here!")
      console.log("AND HERE")
      console.log("UNAME", req.body.username)
      console.log("PASSWORD", req.body.password)
      
      let rows 

      let errObj = {}

      try {
        // rows = await db.query(text, [req.body.username])
        console.log("Query text", createQuery)
        rows = await db.query(createQuery, [req.body.username])
      }
        catch (error) {
        console.log("Error i login query", error)
      }
      console.log("Queryn funkade här kommer rows", rows)
      if (!rows[0]) {
        console.log("No match for user in database")
        errObj = {statusText: "No match for user in database"}
        res.status(400)
        res.send(errObj)
        return
      } else if (rows[0].status === null){
        errObj = {statusText: "User not verified"}
        res.status(400).send(errObj)
        return
      }
      console.log("333We got to here!")
      console.log("Användarnamn stämmer")
      if (!helper.comparePassword(rows[0].passwd, req.body.password)) {
        console.log("Compare pasword sket sig..")
        let errObj = {statusText: "Current password does not match"}
        res.status(400).send(errObj)
        return
      }

      console.log("KOM enda hit")
      const token = helper.generateToken(rows[0].username)
      console.log("Token", token)
      return res.status(200).send({ token })
    } catch (error) {
      console.log("ERROR", error)
      return res.status(400).send(error)
    }
  },

  /**
   * Delete A User
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async deleteUser(req, res) {
    const selectQuery =
      "SELECT * FROM user WHERE username=?"
    const deleteQuery =
      "DELETE FROM user WHERE username=?"
    try {
      let {rows} = await db.query(deleteQuery, [
        req.body.username /* req.user.username */
      ])

      if (!rows[0]) {
        return res.status(404).send({ message: "Användare hittades ej" })
      }
      await db.query(deleteQuery, [
        req.body.username /* req.user.username */
      ])

      return res.status(204).send()
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  async updateUser(req, res) {
    console.log("Running user update on backend")

    const updateQuery =
      `UPDATE user
        SET (fornamn, efternamn, email) =
        (?, ?, ?)
        WHERE username=?`

      try {
        await db.query(updateQuery, [
          req.body.firstname, req.body.lastname, req.body.email,
          req.user.username
        ])
        return res.status(204).send()
      } catch (error) {
        return res.status(400).send(error)
      }
  },

  async setPassword(req, res) {
    console.log("Userid from changePassword:", req.body.userid),
    console.log("New password:", req.body.password)
    console.log("Code:", req.body.code)

    if (!req.body.password) {
      return res.status(400).send({ message: "Lösenord ej angivet" })
    }
    console.log("222We got to here!")
    const createQuery = "SELECT * FROM user WHERE id = ?"

    try {
      const rows = await db.query(createQuery, [req.body.userid])
      console.log("rows", rows)
      console.log("Queryn funkade")
      if (!rows[0]) {
        console.log("No match")
        return res
          .status(400)
          .send({ message: "Inloggningsuppgifterna du angav är felaktiga" })
      } else if (rows[0].pass_code !== req.body.code) {
        console.log("Fel kod", typeof rows[0].pass_code, typeof req.body.code)
        return res
          .status(400)
          .send({ message: "Felaktig kod angiven" })
      } else if(rows[0].password !== null) {
        console.log("Password is not null")
        return res
          .status(400)
          .send({ message: "Lösenord är redan sparat" })
      }
      console.log("333We got to here!")

      const passwordQuery =
        `UPDATE user
          SET password = ?
          WHERE id = ?`

      const hashPassword = helper.hashPassword(req.body.password)
      console.log("hashPassword", hashPassword)
      try {
        await db.query(passwordQuery, [
          hashPassword, req.body.userid
        ])
        console.log("Lösenord bytt")
        return res.status(204).send()
      } catch (error) {
        print(error)
        return res.status(400).send(error)
      }
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  async getUserData(req, res) {
    const createQuery =
    `SELECT username, fornamn, efternamn, email
    FROM user
    WHERE username LIKE ?`

    try {
      const rows = await db.query(createQuery, [req.user.username])
      console.log("Username to use", req.user.username)
      console.log("USER data to send: ", rows)
      return res.status(201).send(rows)
    } catch (error) {
      return res.status(400).send(error)
    }
  },

  async searchUsers(req, res) {
    console.log("Searching for users")
    const createQuery = `SELECT username, hemligt FROM user
    WHERE
      username LIKE
        LOWER(?)
   `

    console.log("QUERY", req.query)
    console.log("QUERY FIRSTNAME", req.query.firstname)

    let username = req.query.username || ""
    let firstname = req.query.firstname || ""
    let lastname = req.query.lastname || ""
    let email = req.query.email || ""

    const values = [username]

    console.log("VALUES", values)

    try {
      const rows = await db.query(createQuery, values)
      console.log("Rows from searchUsers", rows);
      let rowsMod = rows.filter((row) => row.username !== req.user.username)
      return res.status(201).send(rowsMod)
    } catch (error) {
      return res.status(400).send(error)
    }
  },



// #route:  GET /verification/verify-account
// #desc:   Verify user's email address
// #access: Public

  async verifyAccount(req, res) {

    let decoded
    console.log("Verifying account")

    try {
      decoded = await jwt.verify(req.params.secretCode, process.env.SECRET)
    } catch (err) {
      console.log(
        "Error on /api/user/verification/verify-account: jwt verification ",
        err
    )

      return res.sendFile("verification-jwt-fail.html", { root: path.join(__dirname, '../../../public') })  
    }

    const updateUser = `
      UPDATE user
      SET 
        aktiveringskod = null,
        status = 'member'
      WHERE
        aktiveringskod = ?
      AND
        email = ?
    `
    const values = [req.params.secretCode, decoded.email]

    try {          
      const rows = await db.query(updateUser, values)
      console.log("Rows from updateUser", rows);
        
    } catch (err) {
        console.log(
            "Error on /api/auth/verification/verify-account: ",
            err
        );
        
        
        return res.sendFile("verification-db-fail.html", { root: path.join(__dirname, '../../../public') }) 
    } 
    console.log("Verification success")
    res.sendFile("verification-success.html", { root: path.join(__dirname, '../../../public') }) 
 
  }
}

export default User
