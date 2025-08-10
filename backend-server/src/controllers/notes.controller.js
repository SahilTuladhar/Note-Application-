import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { completeNoteQuery, createNoteQuery, deleteNoteQuery, incompleteNoteQuery, updateNoteQuery } from "../models/notes.model.js";
import { findUserByEmail } from "../models/users.model.js";

export const createNote = asyncHandler(async (req, res) => {
  const { title, content, categories } = req.body;

  if (!title || !categories || !Array.isArray(categories) || categories.length === 0) {
    throw new ApiError(400, "Title and at least one category are required");
  }

  const userPayload = req.user;

  if (!userPayload) {
    throw new ApiError(401, "UnAuthorized Access");
  }

  const user = await findUserByEmail(userPayload.email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const noteID = await createNoteQuery(title, content, categories, user.user_id);

  return res
    .status(201)
    .json(new ApiResponse(200, noteID, "Note created successfully"));
});

export const completeNote = asyncHandler(async (req, res) => {
  const { note_id } = req.body;

  if (!note_id) {
    throw new ApiError(401, "Note Update unsuccessful");
  }

  const notesAffected = await completeNoteQuery(note_id);

  return res
    .status(200)
    .json(new ApiResponse(200, {
      notes_affected: notesAffected,
      note_id : note_id
    }, "Note updated successfully"));
});

export const incompleteNote = asyncHandler(async(req, res) => {

  const {note_id} = req.body

  if (!note_id) {
    throw new ApiError(401, "Note Update unsuccessful");
  }
  
  const notesAffected = await incompleteNoteQuery(note_id)

  return res
    .status(200)
    .json(new ApiResponse(200, {
      notes_affected: notesAffected,
      note_id : note_id
    }, "Note updated successfully"));

})

export const deleteNote = asyncHandler(async(req,res) => {
   
  const {note_id} = req.body

  if (!note_id) {
    throw new ApiError(401, "Note Deletion unsuccessful");
  }
  
  const notesAffected = await deleteNoteQuery(note_id)

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    {
      notesAffected: notesAffected,
      note_id: note_id
    },
    "Note Deleted Successfully"
  ))
 
})

export const updateNote = asyncHandler(async(req, res) => {

  const {title , content , categories , note_id} = req.body

  
  if (!title || !categories || !Array.isArray(categories) || categories.length === 0) {
    throw new ApiError(400, "Title and at least one category are required");
  }


  const userPayload = req.user

  if (!userPayload) {
    throw new ApiError(401, "UnAuthorized Access");
  }

  const notesAffected = await updateNoteQuery(title , content , categories , note_id)

  return res
  .status(200)
  .json(
    new ApiResponse(
      200 , {
        notesAffected: notesAffected ,
        note_id: note_id
      },
      "Note Updated Successfully"
    )
  )
  })
