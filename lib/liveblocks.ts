import { Liveblocks } from "@liveblocks/node";

const key = process.env.LIVEBLOCK_PRIVATE_KEY;
let liveblocks = null;

if (!key) {
  throw new Error("LIVEBLOCK_PRIVATE_KEY environment variable is required");
}

try {
  liveblocks = new Liveblocks({ secret: key });
} catch (error) {
  console.error("Failed to initialize Liveblocks:", error);
  throw new Error("Liveblocks initialization failed");
}

export default liveblocks;
