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
import { FormEvent, useState, useTransition } from "react";
// import { DialogClose } from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { inviteUserToDoc } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const pathName = usePathname();
  // const router = useRouter();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();
    const roomId = pathName.split("/").pop();
    if (!roomId) return;
    startTransition(async () => {
      const success = await inviteUserToDoc(roomId, email);
      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("User added to the room successfully");
      } else {
        toast.success("Failed to add user to the room");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{isPending ? "inviting.." : "invite"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite user to collaborate !</DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>
        <form className="flex gap-2" onSubmit={handleInvite}>
          <Input
            type="email"
            placeholder="enter email"
            className="w-full"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button variant="secondary">
            {isPending ? "inviting..." : "invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUser;
