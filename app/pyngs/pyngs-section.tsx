import { Title } from "@/components/common";
import Routes from "@/routes";
import type { Pyng } from "@prisma/client";
import Link from "next/link";
import PyngsTable from "./pyngs-table";

type PyngsSectionProps = {
  pyngs: Pyng[];
};

export default function PyngsSection({ pyngs }: PyngsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Title>Pyngs</Title>
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
