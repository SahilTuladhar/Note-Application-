import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createNoteQuery } from "../models/notes.model.js";
import { findUserByEmail } from "../models/users.model.js";

export const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !category) {
    throw new ApiError(400, "Title and Category are required");
  }

  const userPayload = req.user;

  if (!userPayload) {
    throw new ApiError(401, "UnAuthorized Access");
  }

  const user = await findUserByEmail(userPayload.email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  
  const noteID = await createNoteQuery(title , content , category , user.user_id)

  return res
  .status(201)
  .json( new ApiResponse(200 , noteID, "Note created successfully"))


});
