import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const REFRESH_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;

export const generateAccessToken = (userData) => {
  return jwt.sign(
    userData,

    ACCESS_SECRET,

    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const generateRefreshToken = (userData) => {

    return jwt.sign(
        userData,

        REFRESH_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const verifyAccessToken = (token) => {

    return jwt.verify(token , ACCESS_SECRET)

}

export const verifyRefreshToken = (token) => {

    return jwt.verify(token , REFRESH_SECRET)
}
