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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { FormEvent, useState, useTransition } from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";

type Language =
  | "english"
  | "hindi"
  | "spanish"
  | "portugese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "hindi",
  "spanish",
  "portugese",
  "french",
  "german",
  "chinese",
  "arabic",
  "russian",
  "japanese",
];
function TranslateDoc({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [summary, setSummary] = useState("");
  // const [question, setQuestion] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const documentData = doc.get("document-store").toJSON();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentData,
            targetLang: language,
          }),
        }
      );

      if (res.ok) {
        const { translated_text } = await res.json();
        setSummary(translated_text);
        toast.success("you have recieved the translated summary successfully");
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LanguagesIcon /> {isPending ? " Translating.." : "Translate"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select any language from below to translate and get the summary of
            the document.
          </DialogDescription>
          <hr className="mt-5" />
          {/* {question && <p className="text-gray-500">Q: {question}</p>} */}
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
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {languages.map((language) => (
                  <SelectItem value={language} key={language}>
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button disabled={!language || isPending} type="submit">
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TranslateDoc;
