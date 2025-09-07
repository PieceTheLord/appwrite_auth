import { account } from "../providers/AppwriteConfig";
import { LoginUser } from "../ui/types/User";

export async function loginUser({ email, password }: LoginUser) {
  // try {
  const session = await account.createEmailPasswordSession(email, password);
  return console.log("Login successfully", session.current);
  // Handle successful login
  // } catch (error) {
  //   // Handle login error
  // }
}
