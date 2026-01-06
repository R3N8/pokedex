/** 
 * This function renders a pokéball svg on background
 * Used for visual flair on the pokémon detail header (PokemonDetail.tsx)
 * Color prop allows dynamic styling
*/

interface TypeBackgroundSVGProps {
  color?: string;
}

export default function TypeBackgroundSVG({ color }: TypeBackgroundSVGProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <img
        src="/pokeball.svg"
        alt="Pokeball background"
        className="absolute -top -right-10 w-64 h-64 opacity-20 mix-blend-multiply"
        style={{
          filter: color
            ? `drop-shadow(0 0 0 ${color})`
            : undefined,
        }}
      />
    </div>
  );
}
