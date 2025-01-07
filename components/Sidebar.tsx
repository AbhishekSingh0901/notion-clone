"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import NewDocButton from "./NewDocButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  createAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

export default function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({ owner: [], editor: [] });

  const [data] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].emailAddress.toString())
      )
  );

  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      {
        owner: [],
        editor: [],
      }
    );

    setGroupedData(grouped);
  }, [data]);
  const menuOption = (
    <div className="text-neutral-900 pt-4">
      <div className="flex justify-between items-center border-b py-2 mb-4">
        <h2 className="text-lg font-medium">My Documents</h2>
        <NewDocButton />
      </div>
      {/* My Docs */}
      {!groupedData?.owner.length ? (
        <h2>No Docs Found</h2>
      ) : (
        <>
          {groupedData?.owner.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
          ))}
        </>
      )}
      {/* List.. */}
      {/* Shared with me */}
      {/* List.. */}
      <div className="flex justify-between items-center border-b pt-10 mb-4">
        <h2 className="text-lg font-medium">Shared Documents</h2>
      </div>
      {/* My Docs */}
      {!groupedData?.editor.length ? (
        <h2>No Docs Found</h2>
      ) : (
        <>
          {groupedData?.editor.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
          ))}
        </>
      )}
    </div>
  );
  return (
    <div className="p-2 md:p-4 border-r lg:w-72">
      <div className="hidden lg:inline "> {menuOption}</div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <HamburgerMenuIcon />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            {menuOption}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
