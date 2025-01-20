import { NextFunction, Request, Response } from "express";
import User from "./user.model";

const getAllUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    const currentUser = await User.findOne({ clerkID: req.auth.userId });
    if (!currentUser) {
      res.status(403).json({ message: "Access denied", success: false });
      return;
    }
    const users = await User.find({ clerkID: { $ne: currentUser.clerkID } });
    res.status(200).json({ users, success: true });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getAllUsers,
};
