"use client";

import { Title } from "../common";
import CreatePyngForm from "./create-pyng-form";

export default function CreatePyng({
  userEmail,
  userId,
}: {
  userEmail: string | undefined;
  userId: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Title>Create a Pyng</Title>
      <CreatePyngForm userEmail={userEmail} userId={userId} />
    </div>
  );
}
