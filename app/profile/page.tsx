"use client";

import { account } from "../providers/AppwriteConfig";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching account:", error);
        redirect("/"); // Redirect to login page if not authenticated
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Redirecting to login...</p>; // Should not really be reachable, handled by redirect
  }

  return (
    <>
      <h1>User: {user.name}</h1>
      <h1>Email: {user.email}</h1>
    </>
  );
}
