import RoomProvider from "@/components/RoomProvider";
// import { auth } from "@clerk/nextjs/server";
import { use } from "react";

export default function Doclayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}) {
  // auth.protect();
  const { id } = use(params);
  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
