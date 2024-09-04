import { PageContentContainer, Title } from "@/components/common";
import Routes from "@/routes";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import prisma from "../../prisma/prisma";
import PyngsSection from "./pyngs-section";
import RunsSection from "./runs-section";

export default async function Pyngs() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="mt-16 px-4 md:px-32 py-8 flex flex-col gap-4">
        <Title>Pyngs</Title>
        <p>
          <Link href={Routes.signUp} className="link">
            Sign up
          </Link>{" "}
          to create your first Pyng!
        </p>
      </div>
    );
  }

  const pyngsPromise = prisma.pyng.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const runsPromise = prisma.run.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  const [pyngs, runs] = await Promise.all([pyngsPromise, runsPromise]);

  return (
    <PageContentContainer>
      <PyngsSection pyngs={pyngs} />
      <RunsSection runs={runs} />
    </PageContentContainer>
  );
}
