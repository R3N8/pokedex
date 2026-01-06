/*
* Controlled input field
* Receives value and onChange from parent
* Updates search state in Home component
*/

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex items-center">
      <i className="fa-solid fa-magnifying-glass absolute left-2 text-bg-nav-sec pointer-events-none"></i>
      <input
        type="text"
        id="search"
        name="search"
        className="pl-8 pr-2 py-1 border-2 rounded-sm border-bg-nav-sec bg-bg-light text-sm focus:outline-bg-nav-sec"
        placeholder="Search Pokémon"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
