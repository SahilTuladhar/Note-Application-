import mySqlPool from "../db/db.js";

export const createNoteQuery = async (title, content, categories, userid) => {
  // Insert the note into the notes table
  const sql =
    "INSERT INTO notes (title, content, user_id, created_at) VALUES (?, ?, ?, NOW())";
  const [result] = await mySqlPool.query(sql, [title, content, userid]);
  const note_id = result.insertId;

  // Verify categories exist in the categories table
  const placeholders = categories.map(() => "?").join(", ");
  const selectCategoriesSql = `SELECT categories_id, name FROM categories WHERE name IN (${placeholders})`;
  const [categoriesInDb] = await mySqlPool.query(
    selectCategoriesSql,
    categories
  );

  // Check if all provided categories exist
  if (categoriesInDb.length !== categories.length) {
    throw new Error("One or more categories are invalid");
  }

  // Insert into note_categories join table
  if (categoriesInDb.length > 0) {
    const insertNotesCategoriesSql =
      "INSERT INTO note_categories (note_id, category_id) VALUES ?";
    const insertValues = categoriesInDb.map((cat) => [
      note_id,
      cat.categories_id,
    ]); // Use 'id' or correct column name
    await mySqlPool.query(insertNotesCategoriesSql, [insertValues]);
  }

  return note_id;
};

// export const createNote = async(title, content, category);

export const completeNoteQuery = async (note_id) => {
  const sql =
    "UPDATE notes SET is_completed = 1 WHERE is_completed = 0 AND note_id = ? ";
  const [result] = await mySqlPool.query(sql, [note_id]);
  return result.affectedRows;
};

export const incompleteNoteQuery = async (note_id) => {
  const sql =
    "UPDATE notes SET is_completed = 0 WHERE is_completed = 1 AND note_id = ?";
  const [result] = await mySqlPool.query(sql, [note_id]);
  return result.affectedRows;
};

export const deleteNoteQuery = async (note_id) => {
  const sql = "DELETE FROM notes WHERE note_id = ?";
  const [result] = await mySqlPool.query(sql, [note_id]);
  return result.affectedRows;
};

export const updateNoteQuery = async (title, content, categories, note_id) => {
  try {
    // Update note fields
    const sql =
      "UPDATE notes SET title = ?, content = ?, updated_at = NOW() WHERE note_id = ?";
    const [result] = await mySqlPool.query(sql, [title, content, note_id]);

    // Remove old category links
    const deleteNoteCategoriesSql =
      "DELETE FROM note_categories WHERE note_id = ?";
    await mySqlPool.query(deleteNoteCategoriesSql, [note_id]);

    if (categories.length > 0) {
      // Verify categories exist
      const placeholders = categories.map(() => "?").join(", ");
      const selectCategoriesSql = `SELECT categories_id, name FROM categories WHERE name IN (${placeholders})`;
      const [categoriesInDb] = await mySqlPool.query(
        selectCategoriesSql,
        categories
      );

      if (categoriesInDb.length !== categories.length) {
        throw new Error("One or more categories are invalid");
      }

      // Insert new category links
      const insertNotesCategoriesSql =
        "INSERT INTO note_categories (note_id, category_id) VALUES ?";
      const insertValues = categoriesInDb.map((cat) => [
        note_id,
        cat.categories_id,
      ]);
      await mySqlPool.query(insertNotesCategoriesSql, [insertValues]);
    }

    return result.affectedRows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};
