"use client";

import { account, database } from "../providers/AppwriteConfig";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { ID } from "appwrite";

interface myDoc extends Models.DefaultDocument {
  Title: string;
}

export default function Page() {
  const [user, setUser] = useState<Models.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [docData, setDocData] = useState<{ title: string } | null>(null);
  const [docs, setDocs] =
    useState<Models.DocumentList<myDoc> | null>(null);

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
    const getDocs = async () => {
      try {
        const data = await database.listDocuments<myDoc>(
          "68837205000a39b5ef49",
          "68837c9500317a0f694e"
        );
        setDocs(data);
      } catch (e) {
        console.error("Error fetching documents:", e);
      }
    };
    getUser();
    getDocs();
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
      <h2>ID: {user.$id}</h2>
      <label>Crreate a doc:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={docData?.title}
        onChange={(e) => setDocData({ ...docData, title: e.target.value })}
      />
      <button
        onClick={async () => {
          try {
            await database.createDocument(
              "68837205000a39b5ef49",
              "68837c9500317a0f694e",
              ID.unique(),
              {
                Title: docData?.title,
              }
            );
            const data = await database.listDocuments<myDoc>(
              "68837205000a39b5ef49",
              "68837c9500317a0f694e"
            );
            setDocs(data);
          } catch (err) {
            console.error("Error creating document:", err);
          }
        }}
      >
        Create
      </button>
      <button
        onClick={async () => {
          await account.deleteSessions();
          redirect("/");
        }}
      >
        LogOut
      </button>
      <div>
        {docs &&
          docs.documents.map((doc) => (
            <div key={doc.$id}>
              <h2>Title: {doc.Title}</h2>
            </div>
          ))}
      </div>
    </>
  );
}
