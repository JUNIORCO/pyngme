import { currentUser } from "@clerk/nextjs/server";
import { Title } from "./common";

export default async function CreatePyng() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="flex flex-col gap-2">
      <Title>Create a Pyng</Title>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <p className="font-medium">Send an email to</p>
          <label className="input input-primary input-sm">
            <input
              type="text"
              className="grow"
              placeholder="Email"
              defaultValue={userEmail || ""}
            />
          </label>
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-medium">when</p>
          <textarea
            className="textarea textarea-primary"
            placeholder="Condition"
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-medium">for</p>
          <label className="input input-primary input-sm">
            <input type="text" className="grow" placeholder="Website" />
          </label>
        </div>
      </div>
      <button type="button" className="btn btn-primary">
        Pyng Me!
      </button>
    </div>
  );
}
