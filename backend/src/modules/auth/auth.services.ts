import { TUser } from "../users/user.interface";
import User from "../users/user.model";

const createUserInDb = async (payload: TUser) => {
  const newUser = new User(payload);
  await newUser.save();
  return newUser;
};

export const authService = {
  createUserInDb,
};
