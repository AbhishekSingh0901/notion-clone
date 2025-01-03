"use client";

import * as Y from "yjs";
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
import { toast } from "sonner";
import { Input } from "./ui/input";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

function ChatToDoc({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  // const router = useRouter();

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setQuestion(input);
    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            question: input,
          }),
        }
      );

      if (res.ok) {
        const { message } = await res.json();
        setInput("");
        setSummary(message);

        toast.success("answer sent !");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageCircleCode className="mr-2" />
          Chat to Document
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask your question ?</DialogTitle>
          <DialogDescription>
            Ask any question about your document
          </DialogDescription>
          <hr className="mt-5"></hr>
          {question && <p className="mt-5 text-gray-500">Q: {question} ?</p>}
        </DialogHeader>

        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT {isPending ? "is thinking.." : "Says:"}
              </p>
            </div>
            {isPending ? "" : <Markdown>{summary}</Markdown>}
          </div>
        )}
        <form className="flex gap-2" onSubmit={handleAskQuestion}>
          <Input
            placeholder="e.g. what's this about ?"
            className="w-full"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button variant="secondary">{isPending ? "Asking..." : "Ask"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChatToDoc;
