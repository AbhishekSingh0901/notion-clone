"use client";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default function SidebarOption({
  href,
  id,
}: {
  href: string;
  id: string;
}) {
  const [data] = useDocumentData(doc(db, "documents", id));

  const pathname = usePathname();
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) return null;
  return (
    <div
      className={`rounded-md shadow-sm border-b py-1 px-2 mb-2 ${
        isActive ? "bg-gray-50 " : ""
      }`}
    >
      <Link href={href}>
        <p className="truncate">{data.title}</p>
      </Link>
    </div>
  );
}