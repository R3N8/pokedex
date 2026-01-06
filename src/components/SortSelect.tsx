/*
* Custom dropdown menu
* Allows sorting Pokémon by number or name
* Internal state controls dropdown open/close
* Selected value is lifted to parent via onChange
*/


import { useState } from "react";

interface SelectedSortProps {
  value: "number" | "name";
  onChange: (value: "number" | "name") => void;
}

export default function SelectedSort({ value, onChange }: SelectedSortProps) {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "number", label: "Number", icon: <i className="fa-solid fa-arrow-down-1-9"></i> }, // can replace with FontAwesome SVG later
    { value: "name", label: "Name", icon: <i className="fa-solid fa-arrow-down-a-z"></i> },
  ];

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center justify-between w-auto px-2 py-1 rounded-sm bg-bg-nav-sec font-semibold"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-1 text-text-title cursor-pointer">
          {selectedOption?.icon} {selectedOption?.label}
        </span>
      </button>

      {open && (
        <ul className="absolute mt-1 w-auto bg-bg-nav-sec text-text-title font-bold rounded-md shadow-lg z-10">
          {options.map((opt) => (
            <li
              key={opt.value}
              className="px-2 py-1 hover:bg-white/10 cursor-pointer flex items-center gap-2"
              onClick={() => {
                onChange(opt.value as "number" | "name");
                setOpen(false);
              }}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
