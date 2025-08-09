import mySqlPool from "../db/db.js"

export const createNoteQuery = async(title , content , category , userid) => {
    const sql = "INSERT INTO notes (title , content , category , user_id , created_at) VALUES ( ? , ? , ? , ? , NOW())"
    const [result] = await mySqlPool.query(sql, [title , content , category , userid])
    return result.insertId
}

export const completeNoteQuery = async(note_id) => {
    const sql = "UPDATE notes SET is_completed = 1 WHERE is_completed = 0 AND note_id = ? ";
    const [result] = await mySqlPool.query(sql , [note_id]);
    return result.affectedRows
}

export const incompleteNoteQuery = async(note_id) => {
    const sql = "UPDATE notes SET is_completed = 0 WHERE is_completed = 1 AND note_id = ?";
    const [result] = await mySqlPool.query(sql , [note_id]);
    return result.affectedRows
}