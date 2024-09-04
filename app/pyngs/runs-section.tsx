"use client";

import { Title } from "@/components/common";
import type { Run } from "@prisma/client";
import RunsTable from "./runs-table";

type RunsSectionProps = {
  runs: Run[];
};

export default function RunsSection({ runs }: RunsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Title>Runs</Title>
      {runs.length ? (
        <RunsTable runs={runs} />
      ) : (
        <div>Your runs will appear when you create a Pyng.</div>
      )}
    </div>
  );
}
