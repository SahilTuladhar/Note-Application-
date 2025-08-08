import mySqlPool from "../db/db.js"

export const createNoteQuery = async(title , content , category , userid) => {
    const sql = "INSERT INTO notes (title , content , category , user_id , created_at) VALUES ( ? , ? , ? , ? , NOW())"
    const [result] = await mySqlPool.query(sql, [title , content , category , userid])
    return result.insertId
}