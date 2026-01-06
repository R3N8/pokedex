export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonListItem[];
}

export interface Pokemon {
  id: number;
  name: string;
  species: string;
  description: string;
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  cries?: {
    latest?: string;
    legacy?: string;
  };
}

export const typeColors: Record<string, string> = {
  normal: "#B8B8AB",
  fire: "#EA5437",
  water: "#6392CD",
  electric: "#F7CD55",
  grass: "#8DC265",
  ice: "#93D5F5",
  fighting: "#AF5B4C",
  poison: "#A05B97",
  ground: "#CFB363",
  flying: "#7694CA",
  psychic: "#ED6392",
  bug: "#AFBA42",
  rock: "#B7A76D",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#72564B",
  steel: "#A4A3B3",
  fairy: "#DBB0D5",
};
