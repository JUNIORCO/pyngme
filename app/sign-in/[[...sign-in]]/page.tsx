"use client";

import { SignIn, useClerk } from "@clerk/nextjs";

const SignInSkeleton = () => {
  return <div className="skeleton w-96 h-[28rem]" />;
};

export default function Page() {
  const clerk = useClerk();

  return (
    <div className="flex justify-center items-center h-screen">
      {clerk.loaded ? <SignIn /> : <SignInSkeleton />}
    </div>
  );
}
