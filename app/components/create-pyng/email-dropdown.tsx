"use client";

import { useEffect, useRef, useState } from "react";

type EmailDropdownProps = {
  userEmail: string | undefined;
};

export default function EmailDropdown({ userEmail }: EmailDropdownProps) {
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const showDropdown = isOpen && userEmail;

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown w-full" ref={dropdownRef}>
      <label className="input input-bordered flex items-center gap-8">
        Email
        <input
          type="text"
          placeholder="john@doe.com"
          className="grow w-full"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          onClick={toggleDropdown}
        />
      </label>
      {showDropdown && (
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
          <li>
            <button
              type="button"
              onClick={() => {
                setSelectedValue(userEmail);
                setIsOpen(false);
              }}
            >
              {userEmail}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
