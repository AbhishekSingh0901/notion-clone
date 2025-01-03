"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";

function DeleteDoc() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pathName = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    const roomId = pathName.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
      const success = await deleteDocument(roomId);
      if (success) {
        setIsOpen(false);
        router.replace("/");
        toast.success("Room deleted successfully");
      } else {
        toast.success("Failed to delete room");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you wanna delete the document ?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            document and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting" : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDoc;
