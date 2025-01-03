import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";
function FollowPointer({
  info,
  x,
  y,
}: {
  x: number;
  y: number;
  info: { name: string; email: string; avatar: string };
}) {
  // console.log(info);
  const color = stringToColor(info.email || "1");
  return (
    <motion.div
      className=" absolute z-50 "
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      <motion.div
        style={{
          backgroundColor: color,
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="mt-1 px-2 py-1 rounded-full text-sm text-neutral-500"
      >
        {info.name || info.email}
      </motion.div>
    </motion.div>
  );
}

export default FollowPointer;
