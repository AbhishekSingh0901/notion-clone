"use client";

import { SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";

function Header() {
  const { user } = useUser();
  return (
    <div className=" flex items-center justify-between px-5 py-3 shadow-md">
      {user && (
        <h1 className="text-lg font-medium">
          <span className="text-blue-700">{`${user?.firstName}'s`}</span> Space
        </h1>
      )}
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Header;
