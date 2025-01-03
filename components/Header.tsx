"use client";

import { SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";

import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const { user } = useUser();
  return (
    <div className=" flex items-center justify-between px-5 py-3 border-b">
      {user && (
        <h1 className="text-lg font-bold text-neutral-600">
          <span className="text-orange-600">{`${user?.firstName}'s`}</span>{" "}
          Space
        </h1>
      )}
      <Breadcrumbs />
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
