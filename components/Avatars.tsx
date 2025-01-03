"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
function Avatars() {
  const others = useOthers();
  const self = useSelf();

  const all = [self, ...others];
  return (
    <div className="flex gap-2 items-center">
      <p className="font-light text-sm">User currently editing this page</p>
      <div className="flex -space-x-3">
        {all.map((user, i) => (
          <TooltipProvider key={user?.id + i}>
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="border hover:z-50">
                  <AvatarImage src={user?.info?.avatar} />
                  <AvatarFallback>{user?.info?.name}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-100">
                <p className="text-sm text-muted-foreground">
                  {self?.id === user?.id ? "You" : user.info.name}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}

export default Avatars;
