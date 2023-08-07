import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHnadler.js";
import { User } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) return next(new ErrorHandler("Login First", 404));
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
};
