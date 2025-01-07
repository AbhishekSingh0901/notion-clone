"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";

import { CirclePlus, Loader } from "lucide-react";

export default function NewDocButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateNewDoc = () => {
    startTransition(async () => {
      const docId = await createNewDocument();

      router.push(`/doc/${docId}`);
    });
  };
  return (
    <button
      onClick={handleCreateNewDoc}
      disabled={isPending}
      className="hover:scale-105 active:scale-100 trasition-all duration-200 hover:text-red-500"
    >
      {isPending ? <Loader className=" animate-spin" /> : <CirclePlus />}
    </button>
  );
}
