import { Request, Response } from "express";
import User from "../users/user.model";
import { authService } from "./auth.services";

// const systemSignUp = async (req: Request, res: Response) => {
//   const { id, fullName, lastName, imageUrl } = req.body;
//   try {
//     const user = await User.findOne({ clerkID: id });
//     if (user) {
//       return res
//         .status(400)
//         .json({ message: "User already exists", success: false });
//     }
//     const newUser = new User({ id, fullName, lastName, imageUrl });

//     await newUser.save();
//     res
//       .status(201)
//       .json({ message: "User created successfully", success: true });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message, success: false });
//   }
// };

const systemSignUp = async (req: Request, res: Response) => {
  const { id, firstName, lastName, imageUrl } = req.body;
  try {
    const user = await authService.createUserInDb({
      clerkID: id,
      fullName: `${firstName} ${lastName}`,
      imageUrl,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user, success: true });
  } catch (error: any) {
    const statusCode = error.message === "User already exists" ? 400 : 500;
    res.status(statusCode).json({ message: error.message, success: false });
  }
};
export const authController = {
  systemSignUp,
};
