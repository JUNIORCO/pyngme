"use client";

import Routes from "@/routes";
import { UserButton, useClerk } from "@clerk/nextjs";
import Link from "next/link";

const UserProfile = () => {
  const clerk = useClerk();

  return clerk.loaded ? (
    <UserButton />
  ) : (
    <div className="skeleton w-7 h-7 rounded-full" />
  );
};

type AuthProps = {
  isSignedIn: boolean;
};
export default function Auth({ isSignedIn }: AuthProps) {
  return isSignedIn ? (
    <UserProfile />
  ) : (
    <Link href={Routes.signUp}>
      <button type="button" className="btn btn-outline">
        Sign Up
      </button>
    </Link>
  );
}
