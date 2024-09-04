import { currentUser } from "@clerk/nextjs/server";
import HomePageContent from "./page-content";

export default async function HomePage() {
  const user = await currentUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userId = user?.id;

  return <HomePageContent userEmail={userEmail} userId={userId} />;
}
