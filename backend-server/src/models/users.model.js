// DATABASE INTERACTION CODE

// NOTE: Each function inside Model is used to perform a specific task (INSERT , UPDATE , DELETE)

import mySqlPool from "../db/db.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createUser = async (username, email, password) => {
  const sql =
    "INSERT INTO users (username , email , password) VALUES (? , ? , ?)";
  const [result] = await mySqlPool.query(sql, [username, email, password]);
  return result.insertId;
};

export const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows] = await mySqlPool.query(sql, [email]);
  return rows[0];
};

// export const getNotesByUserId = async(id) => {

//     const sql = "SELECT * FROM notes WHERE user_id = ?"
//     const[rows] = await mySqlPool.query(sql , [id])
//     return rows
// }

export const getAllNotesByUserId = async (id , limit , offset) => {
  const sql = `
    SELECT 
        n.note_id,
        n.title,
        n.content,
        n.user_id,
        n.created_at,
        n.is_completed,
        n.updated_at,
        GROUP_CONCAT(c.name) AS categories
    FROM 
        notes n
    LEFT JOIN 
        note_categories nc ON n.note_id = nc.note_id
    LEFT JOIN 
        categories c ON nc.category_id = c.categories_id
    WHERE 
        n.user_id = ?
    GROUP BY 
        n.note_id, n.title, n.content, n.user_id, n.created_at, n.is_completed, n.updated_at
    ORDER BY n.created_at DESC
    LIMIT ? OFFSET ?
  `;


  const countSql = `
   SELECT COUNT(*) AS total
   FROM notes
   WHERE user_id = ?
  `

  const [notes] = await mySqlPool.query(sql, [id , limit , offset]);
  const[countResult] = await mySqlPool.query(countSql , [id])

  return{
     notes: notes.map((note) => ({
    ...note,
    categories: note.categories ? note.categories.split(",") : [],
  })),
  total: countResult[0].total
  }
};

export const getNotesByCategory = async (id, category , limit , offset) => {
  const sql = `
   SELECT 
        n.note_id,
        n.title,
        n.content,
        n.user_id,
        n.created_at,
        n.is_completed,
        n.updated_at,
        GROUP_CONCAT(c.name) AS categories
    FROM 
        notes n
    LEFT JOIN 
        note_categories nc ON n.note_id = nc.note_id
    LEFT JOIN 
        categories c ON nc.category_id = c.categories_id
    WHERE 
        n.user_id = ? 
        AND EXISTS (
            SELECT 1
            FROM note_categories nc2
            JOIN categories c2 ON nc2.category_id = c2.categories_id
            WHERE nc2.note_id = n.note_id AND c2.name = ?
        )
    GROUP BY 
        n.note_id, n.title, n.content, n.user_id, n.created_at, n.is_completed, n.updated_at
    ORDER BY n.created_at DESC
    LIMIT ? OFFSET ?
    `;

    const countSql = `
    SELECT COUNT(DISTINCT n.note_id) AS total
    FROM notes n
    LEFT JOIN note_categories nc ON n.note_id = nc.note_id
    LEFT JOIN categories c ON nc.category_id = c.categories_id
    WHERE n.user_id = ? AND c.name = ?
  `;


    const [notes] = await mySqlPool.query(sql , [id , category , limit , offset])
    const [countResult] = await mySqlPool.query(countSql, [id, category]);
    
    return {
    notes: notes.map((note) => ({
      ...note,
      categories: note.categories ? note.categories.split(",") : [],
    })),
    total: countResult[0].total,
  };
};
