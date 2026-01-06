import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPokemonById } from "../api/constants";
import type { Pokemon } from "../types/index";
import { typeColors } from "../types/index";
import TypeBackgroundSVG from "../components/TypeBackgroundSVG";

export default function PokemonDetail() {

  // extract pokémon ID form route -> e.g. /pokemon/15
  const { id } = useParams();

  // navigate back to the home page
  const navigate = useNavigate();

  // stores fetched pokémon data
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  
  // reference to the audio element (for the pokémon cry)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // fetch pokémon data when the ID changes
  useEffect(() => {
    if (id) getPokemonById(id).then(setPokemon);
  }, [id]);

  // show loading state until data arrives
  if (!pokemon) return <p className="p-4">Loading...</p>;

  // we will use the first pokémon type (fire, water, etc) as primary theme color 
  const primaryType = pokemon.types[0].type.name;
  const bgColor = typeColors[primaryType];

  // page container with styling
  return (
    <div className="min-h-screen bg-bg-light">
      {/* HEADER CARD */}
      <div className="relative text-text-title overflow-hidden" style={{ backgroundColor: bgColor }}>
        <TypeBackgroundSVG color="#ffffff" />

        {/* TOP BAR */}
        <div className="relative z-10 flex items-start justify-between p-4">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-bold capitalize flex justify-center items-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left-long"></i> back
          </button>

          <div className="flex flex-col justify-center items-center">
            <h2 className="capitalize text-lg font-bold">{pokemon.name}</h2>
            <p className="text-text-title font-bold">{pokemon.species}</p>
          </div>
          
          <span className="text-md font-bold">#{pokemon.id.toString().padStart(3, "0")}</span>
        </div>

        {/* IMAGE */}
        <div className="relative z-10 flex justify-center mt-4 mb-4">
          <img
            className="w-40 h-40 md:w-48 md:h-48 object-contain"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
      </div>

      {/* INFO SECTION */}
      <section className="mt-6 px-4 space-y-6">
        {/* TYPES */}
        <div className="flex justify-center gap-2">
          {pokemon.types.map(t => (
            <span
              key={t.type.name}
              className="px-3 py-1 rounded-full text-sm text-white capitalize"
              style={{ backgroundColor: typeColors[t.type.name] }}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* PHYSICAL STATS & CRY */}
        <div className="flex w-full max-w-md mx-auto border border-transparent">
          {/* Height */}
          <div className="flex-1 flex flex-col items-center">
            <p className="text-2xl font-bold">{pokemon.height}</p>
            <p>Height</p>
          </div>

          {/* Weight */}
          <div className="flex-1 flex flex-col items-center border-l-2 border-r-2 border-text-body/30">
            <p className="text-2xl font-bold">{pokemon.weight}</p>
            <p>Weight</p>
          </div>

          {/* Cry */}
          {pokemon.cries?.latest && (
            <div className="flex-1 flex flex-col items-center">
              <button
                onClick={() => audioRef.current?.play()}
                className="w-8 h-8 rounded-full bg-text-body text-text-title backdrop-blur-md flex items-center justify-center hover:bg-text-body/30 hover:text-text-body cursor-pointer transition"
              >
                <i className="fa-solid fa-play"></i>
              </button>
              <p>Cry</p>
              <audio ref={audioRef} src={pokemon.cries.latest} />
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        {pokemon.description && (
          <p className="text-center font-semibold">{pokemon.description}</p>
        )}

        {/* STATS */}
        <div className="space-y-2">
          <ul className="space-y-2 pb-5">
            {pokemon.stats.map(s => (
              <li key={s.stat.name} className="flex items-center gap-2">
                <span className="w-20 font-bold capitalize" style={{color: bgColor,}}>{s.stat.name}</span>
                <span className="w-10 text-sm font-bold">{s.base_stat}</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.base_stat}%`,
                      backgroundColor: bgColor,
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
