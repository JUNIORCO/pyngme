"use client";

import Routes from "@/routes";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const clerk = useClerk();

  const handleSignOut = () => {
    setLoading(true);
    clerk.signOut(() => {
      setLoading(false);
    });
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-start md:dropdown-end">
      <div tabIndex={0} role="button" className="avatar">
        <div className="w-10 rounded-full">
          <img src={clerk.user?.imageUrl} alt="User avatar" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li onClick={() => clerk.openUserProfile()}>
          <p>Profile</p>
        </li>
        <li>
          <p>Billing</p>
        </li>
        <li onClick={handleSignOut}>
          <p>Sign Out {loading ? <LoaderIcon /> : null}</p>
        </li>
      </ul>
    </div>
  );
};

const AuthLoaded = () => {
  const { user } = useUser();

  return user ? (
    <UserProfile />
  ) : (
    <Link href={Routes.signUp}>
      <button type="button" className="btn btn-outline">
        Sign Up
      </button>
    </Link>
  );
};

export default function Auth() {
  const { isLoaded } = useUser();

  return isLoaded ? (
    <AuthLoaded />
  ) : (
    <div className="skeleton w-10 h-10 rounded-full" />
  );
}
