"use client";

import { Title } from "@/components/common";
import Routes from "@/routes";
import type { Pyng, Run } from "@prisma/client";
import RunsTable from "./runs-table";
import Pagination from "@/components/pagination";

type RunsSectionProps = {
  runs: (Run & { pyng: Pyng })[];
  totalRuns: number;
  page: number;
  limit: number;
};

export default function RunsSection({
  runs,
  totalRuns,
  page,
  limit,
}: RunsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Title>Runs</Title>
      {runs.length ? (
        <>
          <RunsTable runs={runs} />
          <Pagination
            currentPage={page}
            totalItems={totalRuns}
            itemsPerPage={limit}
            path={Routes.pyngs}
          />
        </>
      ) : (
        <div>Your runs will appear when you create a Pyng.</div>
      )}
    </div>
  );
}
