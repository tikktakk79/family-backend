import jwt from "jsonwebtoken"
import db from "../db"

const Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyToken(req, res, next) {
    const token = req.headers["x-access-token"]
    if (!token) {
      return res.status(401).send({ message: "Token is not provided" })
    }
    try {
      console.log("verifying token")
      const decoded = await jwt.verify(token, process.env.SECRET)
      const text = `select a.name as accessgroup, u.id as userid from user as u
        left join accessgroups as a
        on u.accessgroup_id = a.id
      where u.username = ?
      `
      const rows = await db.query(text, [decoded.username])
      // console.log("Token verification query worked")
      console.log("ROWS FROM AUTH", rows)
      if (!rows[0]) {
        console.log("INVALID TOKEN PROVIDED!!!")
        return res
          .status(401)
          .send({ message: "The token you provided is invalid" })
      }
      req.user = { username: decoded.username }
      req.userLevel = rows[0].accessgroup
      req.userId = rows[0].userid
      next()
    } catch (error) {
      console.log("Some unidentified error in token verification")
      return res.status(400).send(error)
    }
  }
}

export default Auth
