"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";

import useOwner from "@/lib/useOwner";
import { useRoom } from "@liveblocks/react/suspense";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { removeUserFromDocument } from "@/actions/actions";

function ManageUsers() {
  const { user } = useUser();
  const room = useRoom();
  const isOwner = useOwner();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  // const router = useRouter();

  const handleDelete = async (userId: string) => {
    startTransition(async () => {
      if (!user) return;
      const { success } = await removeUserFromDocument(room.id, userId);

      if (success) {
        toast.success("User removed successfully");
      } else {
        toast.error("Failed to remove user");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Users {`(${usersInRoom?.docs.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with access</DialogTitle>
          <DialogDescription>
            Below is the list of user with access to the room.
          </DialogDescription>
        </DialogHeader>
        <hr className="my-4"></hr>
        <div>
          {usersInRoom?.docs.map((doc) => {
            return (
              <div
                key={doc.data().userId}
                className="flex items-center justify-between mb-2"
              >
                <p className="text-sm">
                  {doc.data().userId === user?.emailAddresses[0].toString()
                    ? `You (${doc.data().userId})`
                    : doc.data().userId}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">
                    {doc.data().role}
                  </Button>

                  {isOwner &&
                    doc.data().userId !==
                      user?.emailAddresses[0].toString() && (
                      <Button
                        onClick={() => handleDelete(doc.data().userId)}
                        variant="destructive"
                        disabled={isPending}
                        size="sm"
                      >
                        Delete
                      </Button>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ManageUsers;
