"use client";

import { Title } from "@/components/common";
import Routes from "@/routes";
import { useUser } from "@clerk/nextjs";
import type { Pyng } from "@prisma/client";
import Link from "next/link";
import PyngsTable from "./pyngs-table";

type PyngsSectionProps = {
  pyngs: Pyng[];
};

export default function PyngsSection({ pyngs }: PyngsSectionProps) {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Title>Pyngs</Title>
        {pyngs.length > 0 ? (
          <p>Pyngs will be sent to {email} when the condition is met.</p>
        ) : null}
      </div>
      {pyngs.length > 0 ? (
        <PyngsTable pyngs={pyngs} />
      ) : (
        <div>
          You have no Pyngs yet. Create one from the{" "}
          <Link href={Routes.hub} className="link">
            hub
          </Link>
          !
        </div>
      )}
    </div>
  );
}
