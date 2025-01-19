import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // Temporarily set to false for testing
    secure: false,
    sameSite: "lax",
    path: "/", // Ensure the cookie is available throughout the site
  });
  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;



// why token is needed
// whe user is register with its email id then its genrate the token , so we take as it is authorize person and give the acces.it use in client side and  fronted
// 1. token is a string that can be stored in a cookie
// 2. token is a string that can be stored in a database
// 3. token is a string that can be sent in the header of a request
