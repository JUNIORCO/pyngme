import { EVERY_OPTIONS_MAP } from "@/components/create-pyng/every-options-map";
import type { Pyng } from "@prisma/client";

type PyngsTableProps = {
  pyngs: Pyng[];
};

export default function PyngsTable({ pyngs }: PyngsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>When</th>
            <th>For</th>
            <th>Every</th>
          </tr>
        </thead>
        <tbody>
          {pyngs.map((pyng) => (
            <tr key={pyng.id} className="hover">
              <td>{pyng.name}</td>
              <td>{pyng.email}</td>
              <td>{pyng.condition}</td>
              <td>
                <a
                  href={pyng.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  {pyng.url}
                </a>
              </td>
              <td>{EVERY_OPTIONS_MAP[pyng.every]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
