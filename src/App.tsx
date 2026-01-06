import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";


// Root App component
// This component defines how different URLs map to different pages
function App() {
  return (
    <BrowserRouter> {/* "BrowserRouter" enables React Router and listens to URL changes */}
      <Routes> {/* "Routes" acts as a container for all route definitions */}
        
        {/* Root route: this is main pokédex list page, path "/" renders Home component */}
        <Route path="/" element={<Home />} />

        {/* Dynamic route: parameters allow navigation to individual pokémon pages */}
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

// export app so it can be rendered by main.tsx
export default App;