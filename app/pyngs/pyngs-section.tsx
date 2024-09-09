"use client";

import { Title } from "@/components/common";
import Pagination from "@/components/pagination";
import Routes from "@/routes";
import { useUser } from "@clerk/nextjs";
import type { Pyng } from "@prisma/client";
import Link from "next/link";
import PyngsTable from "./pyngs-table";

type PyngsSectionProps = {
  pyngs: Pyng[];
  totalPyngs: number;
  page: number;
  limit: number;
};

export default function PyngsSection({
  pyngs,
  totalPyngs,
  page,
  limit,
}: PyngsSectionProps) {
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
        <>
          <PyngsTable pyngs={pyngs} />
          <Pagination
            currentPage={page}
            totalItems={totalPyngs}
            itemsPerPage={limit}
            path={Routes.pyngs}
          />
        </>
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
