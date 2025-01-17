import { clerkClient } from "@clerk/express";
import { NextFunction, Request } from "express";
// future solve req:any issues with the global type  express.d.ts
export const protectRoute = async (req: any, res: any, next: any) => {
  if (!req.auth.userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

export const verifyAdmin = async (req: any, res: any, next: any) => {
  try {
    const adminUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === adminUser.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied", success: false });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
