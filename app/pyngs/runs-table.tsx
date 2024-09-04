"use client;";

import Modal from "@/components/modal/modal";
import { useModal } from "@/components/modal/useModal";
import type { Run } from "@prisma/client";
import CustomMarkdown from "./custom-markdown";

type RunsTableProps = {
  runs: Run[];
};

export default function RunsTable({ runs }: RunsTableProps) {
  const { openModal, closeModal, content } = useModal();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Scrape</th>
            <th>Reasoning</th>
            <th>Email Sent</th>
            <th>Ran At</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id} className="hover">
              <td>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() =>
                    openModal(<CustomMarkdown>{run.scrape}</CustomMarkdown>)
                  }
                >
                  View
                </button>
              </td>
              <td>{run.reasoning}</td>
              <td>{run.sentEmail ? "Yes" : "No"}</td>
              <td>{run.createdAt.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal content={content} closeModal={closeModal} />
    </div>
  );
}
