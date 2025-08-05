// DATABASE INTERACTION CODE

// NOTE: Each function inside Model is used to perform a specific task (INSERT , UPDATE , DELETE)

import mySqlPool from "../db/db"

export const createUser = async(username , email , password ) => {
    const sql = "INSERT INTO users (username , email , password) VALUES (? , ? , ?)"
    const [result] = await mySqlPool.query(sql , [username , email , password])
}