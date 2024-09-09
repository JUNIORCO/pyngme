import { PageContentContainer, Title } from "@/components/common";
import Routes from "@/routes";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import prisma from "../../prisma/prisma";
import PyngsSection from "./pyngs-section";
import RunsSection from "./runs-section";

export default async function Pyngs({
  searchParams,
}: {
  searchParams?: { page?: string; limit?: string };
}) {
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

  const page = Number.parseInt(searchParams?.page ?? "1", 10);
  const limit = Number.parseInt(searchParams?.limit ?? "10", 10);
  const skip = (page - 1) * limit;

  const pyngsPromise = prisma.pyng.findMany({
    where: {
      clerkUserId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });

  const pyngsCountPromise = prisma.pyng.count({
    where: {
      clerkUserId: user.id,
    },
  });

  const runsPromise = prisma.run.findMany({
    where: {
      clerkUserId: user.id,
    },
    include: {
      pyng: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: limit,
  });

  const runsCountPromise = prisma.run.count({
    where: {
      clerkUserId: user.id,
    },
  });

  const [pyngs, runs, pyngsCount, runsCount] = await Promise.all([
    pyngsPromise,
    runsPromise,
    pyngsCountPromise,
    runsCountPromise,
  ]);

  return (
    <PageContentContainer>
      <PyngsSection
        pyngs={pyngs}
        totalPyngs={pyngsCount}
        page={page}
        limit={limit}
      />
      <RunsSection
        runs={runs}
        totalRuns={runsCount}
        page={page}
        limit={limit}
      />
    </PageContentContainer>
  );
}
