import { ID } from "appwrite";
import { account } from "../providers/AppwriteConfig";
import { User } from "../ui/types/User";
import { loginUser } from "./loginUser";

export const register = async ({ email, password, name }: User) => {
  await account.create({
    userId: ID.unique(),
    email,
    password,
    name,
  });
  loginUser({email, password});
  return console.log("Registered Succesffully")
};
