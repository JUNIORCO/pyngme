import { currentUser } from "@clerk/nextjs/server";
import { Title } from "../common";
import EmailDropdown from "./email-dropdown";

export default async function CreatePyng() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="flex flex-col gap-2">
      <Title>Create a Pyng</Title>

      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="flex flex-col gap-4 w-[50%] items-center">
          {/* Email */}
          <EmailDropdown userEmail={userEmail} />

          {/* When */}
          <label className="input input-bordered flex items-center gap-7 w-full">
            When
            <input
              type="text"
              className="grow w-full"
              placeholder="a new blog post is published"
            />
          </label>

          {/* For */}
          <label className="input input-bordered flex items-center gap-12 w-full">
            For
            <input
              type="text"
              className="grow w-full"
              placeholder="johnswebsite.com"
            />
          </label>
        </div>

        <button type="button" className="btn btn-primary w-fit px-8">
          Pyng Me!
        </button>
      </div>
    </div>
  );
}
