"use client";
import { loginUser } from "./auth/loginUser";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { User } from "./ui/types/User";
import { register } from "./auth/register";
import { account } from "./providers/AppwriteConfig";
import { redirect } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<User>({ email: "", password: "", name: "" });
  const [isAuth, setIsAuth] = useState<any>(false);
  const updateUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser({ ...user!, [id]: value });
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setIsAuth(userData);
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };
    getUser();
  }, []);
  if (isAuth) redirect('/profile')
  return (
    <>
      <input
        type="text"
        placeholder="email"
        id="email"
        value={user.email}
        onChange={(e) => updateUser(e)}
      />
      <input
        type="text"
        placeholder="name"
        id="name"
        value={user.name}
        onChange={(e) => updateUser(e)}
      />
      <input
        type="text"
        id="password"
        placeholder="passwrod"
        value={user.password}
        onChange={(e) => updateUser(e)}
      />
      <button
        onClick={() => {
          loginUser(user);
          redirect("/profile");
        }}
      >
        Login
      </button>
      <button onClick={() => register(user)}>Register</button>
    </>
  );
}
