import axios from "axios"; // axios is used to make HTTP requests to the pokémon API
import type { Pokemon, PokemonListResponse } from "../types/index";

// base URL
const API_BASE = "https://pokeapi.co/api/v2";

// Fetch list of all the pokémons displayed on the home page
export const getAllPokemon = async () => {
  // use GET request and set limit to 100000 to ensure we get the full list
  const res = await axios.get<PokemonListResponse>(
    `${API_BASE}/pokemon?limit=100000&offset=0`
  );
  return res.data.results;
};

// Types for species endpoint
interface SpeciesResponse {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
  genera: {
    genus: string;
    language: { name: string };
  }[];
}

export const getPokemonById = async (id: string): Promise<Pokemon> => {
  // Fetch main Pokémon data
  const { data: dataPokemon } = await axios.get<Pokemon>(`${API_BASE}/pokemon/${id}`);

  // Fetch species data for description/genus
  const { data: dataSpecies } = await axios.get<SpeciesResponse>(`${API_BASE}/pokemon-species/${id}`);

  // Get English flavor text (description)
  const flavorTextEntry = dataSpecies.flavor_text_entries.find(
    entry => entry.language.name === "en"
  );

  // Get English genus (species type, e.g., "Seed Pokémon")
  const genusEntry = dataSpecies.genera.find(
    entry => entry.language.name === "en"
  );

  // return a normalized pokémon object used by the app
  return {
    id: dataPokemon.id,
    name: dataPokemon.name,
    height: dataPokemon.height,
    weight: dataPokemon.weight,
    types: dataPokemon.types,
    abilities: dataPokemon.abilities,
    sprites: dataPokemon.sprites,
    stats: dataPokemon.stats,
    cries: {
      latest: `https://play.pokemonshowdown.com/audio/cries/${dataPokemon.name}.mp3`,
    },
    description: flavorTextEntry?.flavor_text.replace(/\n|\f/g, " ") ?? "",
    species: genusEntry?.genus ?? "",
  };
};