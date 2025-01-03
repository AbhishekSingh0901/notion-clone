import { ArrowLeftCircle } from "lucide-react";
export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse text-neutral-600">
      <ArrowLeftCircle className="w-12 h-12" />
      <h1 className="font-medium">Get started with creating a new document</h1>
    </main>
  );
}
