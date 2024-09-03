"use client";

import { SignUp, useClerk } from "@clerk/nextjs";

const SignUpSkeleton = () => {
  return <div className="skeleton w-96 h-[30rem]" />;
};

export default function Page() {
  const clerk = useClerk();
  return (
    <div className="flex justify-center items-center h-screen">
      {clerk.loaded ? <SignUp /> : <SignUpSkeleton />}
    </div>
  );
}
