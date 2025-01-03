"use client";

import Document from "@/components/Document";
import { use } from "react";

type DocumentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function DocumentPage(props: DocumentPageProps) {
  const { id } = use(props.params);

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}
