import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";

// Logic for Register user
// 1. Take Data from Req
// 2. Perform Validation
// 3. call createUser function from user model
// 4. check for error , throw error if any
//5. if success return response

const registerUser = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body); // Add this line
  console.log("Request headers:", req.headers); // Add this line

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    // return res.status(400).json({message : "All fields are required"})

    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User Already Exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await createUser(username, email, hashedPassword);

  if (!userId) {
    throw new ApiError(500, "User Failed to be registered in database");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, userId, "User Created Successfully"));
});

export { registerUser };
