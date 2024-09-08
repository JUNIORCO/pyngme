"use client;";

import Modal from "@/components/modal/modal";
import { useModal } from "@/components/modal/useModal";
import type { Pyng, Run } from "@prisma/client";
import CustomMarkdown from "./custom-markdown";

type RunsTableProps = {
  runs: (Run & { pyng: Pyng })[];
};

export default function RunsTable({ runs }: RunsTableProps) {
  const { openModal, closeModal, content } = useModal();

  console.log(runs);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Pyng Name</th>
            <th>Scrape</th>
            <th>Reasoning</th>
            <th>Email Sent</th>
            <th>Status</th>
            <th>Error</th>
            <th>Ran At</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className="hover">
              <td>{run.pyng.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() =>
                    openModal(<CustomMarkdown>{run.scrape}</CustomMarkdown>)
                  }
                >
                  View
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() => openModal(<p>{run.reasoning}</p>)}
                >
                  View
                </button>
              </td>
              <td>{run.sentEmail ? "✅" : "❌"}</td>
              <td>{run.status}</td>
              <td>{run.error}</td>
              <td>{run.createdAt.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal content={content} closeModal={closeModal} />
    </div>
  );
}
