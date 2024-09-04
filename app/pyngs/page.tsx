import { PageContentContainer, Title } from "@/components/common";
import { EVERY_OPTIONS_MAP } from "@/components/create-pyng/every-options-map";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "../../prisma/prisma";
import PyngsSection from "./pyngs-section";
import RunsSection from "./runs-section";

export default async function Pyngs() {
  const user = await currentUser();

  if (!user) {
    return (
      <PageContentContainer>
        <Title>Pyngs</Title>
        <p>Login to view your pyngs.</p>
      </PageContentContainer>
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
