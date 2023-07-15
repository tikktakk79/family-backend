import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword)
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(username) {
    console.log("Hello from generateToken! username is, ", username)
    const token = jwt.sign(
      {
        username: username
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    )
    console.log("Hello AGAIN from generatToken!")
    return token
  },
  createVerificationToken(email) {
    const token = jwt.sign(
      {
        email: email
      },
      process.env.SECRET,
      { expiresIn: 60 * 60 }
    )
    console.log("Hello AGAIN from generatToken!")
    return token
  },

  userRelations(myUser, relations) {
    let friendsMod = []

    relations.map((raw) => {
      let friend = {}


      friend.id = raw.id
      friend.ny_fraga = raw.ny_fraga

      console.log("RAW", raw)

      if (raw.user1 === myUser) {
        friend.username = raw.user2
        friend.fornamn = raw.fnamn2
        friend.efternamn = raw.enamn2
        friend.email = raw.email2
        friend.hemligt = raw.hemligt2
      } else {
        friend.username = raw.user1
        friend.fornamn = raw.fnamn1
        friend.efternamn = raw.enamn1
        friend.email = raw.email1
        friend.hemligt = raw.hemligt1
      }
      if (raw.godkann === myUser) {
        friend.godkann = "you"
      } else if (raw.godkann === friend.username) {
        friend.godkann = "waiting"
      } else {
        friend.godkann = null
      }
      console.log("One iteration..")
      friendsMod.push(friend)
    })
    console.log("All iterations done")
    console.log("friensMod from helper method", friendsMod)

    return friendsMod
  },
  async permissionFriend(db, req) {

    let createQuery1 = `
      SELECT hemligt from user 
      WHERE
        username LIKE ?
    `

    let rows = await db.query(createQuery1, [req.body.username])

    console.log("rows from permissionFriend", rows)

    if (!rows[0].hemligt) {
      console.log("TRUE DAT");
      return true
    }

    let createQuery2 = `
    select * from vanner
    where 
      (user1 LIKE ? AND user2 LIKE ?)
    OR 
      (user2 LIKE ? AND user1 LIKE ?)
    AND  
      (godkann IS NULL OR godkann LIKE ?)
    `

    let rows2 = await db.query(createQuery2, [req.user.username, req.body.username,req.user.username, req.body.username,req.user.username])
    
    if(rows2[0].length) {
      console.log("TRUE DAT");
      return true
    }
    console.log("FALSE DAT");
    return false
  }
}


export default Helper
