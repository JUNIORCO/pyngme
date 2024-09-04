"use client";

import { useEffect, useRef, useState } from "react";
import { type UseControllerProps, useController } from "react-hook-form";
import type { IFormInput } from "./types";

type EmailDropdownProps = UseControllerProps<IFormInput> & {
  userEmail: string | undefined;
};

export default function EmailDropdown({
  userEmail,
  ...props
}: EmailDropdownProps) {
  const { field, fieldState } = useController(props);

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
      <label
        className={`input input-bordered ${
          fieldState.error ? "input-error" : ""
        } flex items-center gap-8`}
      >
        <p className="font-medium">Email</p>
        <input
          {...field}
          id="email-input"
          type="text"
          placeholder="john@doe.com"
          className="grow w-full"
          onClick={toggleDropdown}
          value={field.value || ""}
        />
      </label>
      {fieldState.error && (
        <div className="label justify-end pb-0">
          <span className="label-text-alt text-error">
            {fieldState.error.type === "required"
              ? "Email is required"
              : fieldState.error?.message}
          </span>
        </div>
      )}
      {showDropdown && (
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
          <li>
            <button
              type="button"
              onClick={() => {
                field.onChange(userEmail);
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
