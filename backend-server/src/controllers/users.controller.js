import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  getAllNotesByUserId,
  getNotesByCategory,
} from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenHandler.js";

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
    .status(200)
    .json(new ApiResponse(200, userId, "User Created Successfully"));
});

// Logic for Login User
// 1. Get data from body
// 2. Find user by email
// 3. Verify Password for the email by using bcrypt
// 4. Generate Access and Refresh Tokens
// 5. Store the tokens in cookies
// 6. Proivde informative response

const ACCESS_TOKEN_EXPIRES = 60 * 60 * 1000; // 60 min
const REFRESH_TOKEN_EXPIRES = 1 * 24 * 60 * 60 * 1000; // 7 days

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password Required");
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "User Not Found");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ApiError(401, "Incorrect Password");
  }

  // creating access and refresh tokens

  const tokenPayload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  const accessOptions = {
    httpOnly: true,
    secure: true,
    max: 60 * 60 * 1000, // 1h
  };

  const refreshOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, accessOptions)
    .cookie("refreshToken", refreshToken, refreshOptions)
    .json(
      new ApiResponse(
        200,
        {
          user,
        },
        "User Logged in Successfully"
      )
    );
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new ApiError(401, "Refresh Token Expired");
  }

  const decodedToken = verifyRefreshToken(token);

  const newAccessToken = generateAccessToken({
    id: decodedToken.id,
    email: decodedToken.email,
  });

  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 1000,
  };

  res.cookie("accessToken", newAccessToken, options);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Access Token Refreshed Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged Out Successfully"));
});

const getUserRecords = asyncHandler(async (req, res) => {
  const category = req.query.category;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const userPayload = req.user;

  if (!userPayload) {
    throw new ApiError(401, "Unauthorized Access");
  }

  let userNotes, totalNotes;
  const user = await findUserByEmail(userPayload.email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!category || category === "All") {
    const { notes, total } = await getAllNotesByUserId(
      user.user_id,
      limit,
      offset
    );
    userNotes = notes;
    totalNotes = total;
  } else {
    const { notes, total } = await getNotesByCategory(
      user.user_id,
      category,
      limit,
      offset
    );
    userNotes = notes;
    totalNotes = total;
  }

  console.log("NOTES:" , userNotes);
  console.log("TOTALNOTES", totalNotes);
  

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        username: user.username,
        notes: userNotes,
        total: totalNotes,
        totalPages: Math.ceil(totalNotes / limit),
        currentPage: page,
      },
      "User Records Retrieved Successfully"
    )
  );
});

export { registerUser, loginUser, refreshToken, logoutUser, getUserRecords };
