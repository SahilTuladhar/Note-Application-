// DATABASE INTERACTION CODE

// NOTE: Each function inside Model is used to perform a specific task (INSERT , UPDATE , DELETE)

import mySqlPool from "../db/db.js"
import asyncHandler from "../utils/asyncHandler.js"

export const createUser = async(username , email , password ) => {
    const sql = "INSERT INTO users (username , email , password) VALUES (? , ? , ?)"
    const [result] = await mySqlPool.query(sql , [username , email , password])
    return result.insertId
}

export const findUserByEmail = async(email) => {
   const sql = "SELECT * FROM users WHERE email = ?";
   const [rows] = await mySqlPool.query(sql , [email])
   return rows[0] 
}

