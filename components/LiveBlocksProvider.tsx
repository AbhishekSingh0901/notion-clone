"use client";
import { LiveblocksProvider } from "@liveblocks/react/suspense";
function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_LIVEBLOCK_PUBLIC_KEY environment variable. Please set it in your Next.js environment."
    );
  }
  return (
    <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
      {children}
    </LiveblocksProvider>
  );
}

export default LiveBlocksProvider;
