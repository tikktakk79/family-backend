import db from "../db"

const test = {
  async getPrograms(req, res) {
    const createQuery = `
    SELECT * FROM test
    `

    try {
      const rows  = await db.query(createQuery)

      console.log("Rows inside test", rows)

      console.log("Test rows", rows)
      return res.status(200).send(rows)
    } catch (error) {
      console.log("Fel i test", error)
      return res.status(400).send(error)
    }
  }
}

export default test
