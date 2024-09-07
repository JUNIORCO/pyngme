"use client";

import { deletePyng } from "@/actions/delete-pyng";
import { EVERY_OPTIONS_MAP } from "@/components/create-pyng/every-options-map";
import type { Pyng } from "@prisma/client";
import { Ellipsis, LoaderCircle } from "lucide-react";
import { useState } from "react";

const shortenUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.hostname}${parsedUrl.pathname.length > 1 ? "/..." : ""}`;
  } catch {
    return url.length > 30 ? `${url.substring(0, 27)}...` : url;
  }
};

type PyngsTableProps = {
  pyngs: Pyng[];
};

export default function PyngsTable({ pyngs }: PyngsTableProps) {
  const [deletingPyng, setDeletingPyng] = useState<string | null>(null);

  const handleDeletePyng = async (pyngId: string) => {
    if (deletingPyng) {
      return;
    }
    setDeletingPyng(pyngId);
    await deletePyng(pyngId);
    setDeletingPyng(null);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>When</th>
            <th>For</th>
            <th>Every</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pyngs.map((pyng) => (
            <tr key={pyng.id} className="hover">
              <td>{pyng.name}</td>
              <td>{pyng.condition}</td>
              <td>
                <a
                  href={pyng.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                  title={pyng.url}
                >
                  {shortenUrl(pyng.url)}
                </a>
              </td>
              <td>{EVERY_OPTIONS_MAP[pyng.every]}</td>
              <td>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-sm">
                    <Ellipsis className="w-4" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li onClick={() => handleDeletePyng(pyng.id)}>
                      {deletingPyng === pyng.id ? (
                        <p>
                          Deleting{" "}
                          <LoaderCircle className="w-4 h-4 animate-spin" />
                        </p>
                      ) : (
                        <p>Delete</p>
                      )}
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
