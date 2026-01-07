import { useEffect, useMemo, useState } from "react"; // These are react hooks for lifecycle, memoization and local state
import { Link } from "react-router-dom"; // "Link" allows client-side navigation without full page reload
import { getAllPokemon } from "../api/constants";
import type { PokemonListItem } from "../types/index";
import SearchBar from "../components/SearchBar";
import SelectedSort from "../components/SortSelect";

export default function Home() {

  // store the full list of Pokémons fetched from the api
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  
  // store the current search input value
  const [search, setSearch] = useState("");
  
  // store current sorting mode
  const [sort, setSort] = useState<"number" | "name">("number");

  // fetch the pokémon list once when the component mounts
  useEffect(() => {
    // getAllPokemon returns a promise -> setPokemon stores the result
    getAllPokemon().then(setPokemon);
  }, []);

  // memoized list after filtering and sorting
  // prevents unnecessary recalculations on every render
  const filtered = useMemo(() => {
    return pokemon
      // filter pokémon by search text (case-insensitive)
      .filter((p) => p.name.includes(search.toLowerCase()))
      
      // sort pokémon either by name or number
      .sort((a, b) =>
        sort === "name"
          // alphabetical sort
          ? a.name.localeCompare(b.name)
          // numerical sort using extracted ID
          : getId(a.url) - getId(b.url)
      );
  }, [pokemon, search, sort]); // re-run only when these values change

  // main page container with styling
  return (
    <div className="min-h-screen bg-body-gradient">
      {/* NAV */}
      <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-bg-nav-pri">
        <div className="flex items-center justify-center gap-2">
            <img src="/logo_pokeball.svg" alt="logo" className="w-8 h-8 border-2 rounded-full border-text-body" />
            <p className="font-display text-text-title">Pokédex</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <SearchBar value={search} onChange={setSearch} />
          <SelectedSort value={sort} onChange={setSort} />
        </div>
      </nav>

      {/* GRID */}
      <section className="grid grid-cols-3 gap-0">
        {filtered.map((p) => {
          const id = getId(p.url);
          return (
            <div key={p.name} className="grid-cell">
              <Link
                to={`/pokemon/${id}`}
                className="relative flex flex-col items-center justify-center p-4 text-center rounded-lg hover:bg-white/10 hover:backdrop-blur-md hover:border hover:border-white/30 hover:shadow-xl"
              >
                <span className="absolute text-xs top-1 right-2 font-body">
                  #{id.toString().padStart(3, "0")}
                </span>

                <img
                  className="object-cover w-20 h-20 md:w-30 md:h-30"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={p.name}
                />

                <p className="mt-2 font-bold capitalize">{p.name}</p>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}

// extract pokémon ID from its API URL
function getId(url: string) {
  return Number(url.split("/").slice(-2, -1)[0]);
}
