import { currentUser } from "@clerk/nextjs/server";
import { Title } from "../common";
import CreatePyngForm from "./create-pyng-form";

export default async function CreatePyng() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userId = user?.id;

  return (
    <div className="flex flex-col gap-2">
      <Title>Create a Pyng</Title>
      <CreatePyngForm userEmail={userEmail} userId={userId} />
    </div>
  );
}
