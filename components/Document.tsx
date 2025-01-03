"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDoc from "./DeleteDoc";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

export default function Document({ id }: { id: string }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpadating, startTransition] = useTransition();
  const isOwner = useOwner();
  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div>
        {/* form to update title */}
        <form className="flex gap-2 items-center" onSubmit={updateTitle}>
          <Input
            className="border-t-0 border-x-0 shadow-none rounded-none text-lg font-medium"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={isUpadating} type="submit">
            {isUpadating ? "Updating..." : "Update"}
          </Button>

          {isOwner && (
            <>
              <InviteUser />
              <DeleteDoc />
            </>
          )}
        </form>
      </div>
      <div className="py-4 border-b flex justify-between items-center w-full">
        {/* manage users */}
        <ManageUsers />
        {/* manage avatars */}
        <Avatars />
      </div>
      <div className="py-10">
        {/* editor */}
        <Editor />
      </div>
    </div>
  );
}
