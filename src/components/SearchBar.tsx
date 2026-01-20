import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // IMPORTANTE
import Fuse from "fuse.js";
import type { Review } from "../types/Reviews";
import ThemeToggle from "./ThemeToggle";
import "../index.css"

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Review[]>([]);
  const [fuse, setFuse] = useState<Fuse<Review> | null>(null);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then(res => res.json())
      .then((data: Review[]) => setFuse(new Fuse(data, {
        keys: ["titulo"],
        threshold: 0.4,
        ignoreLocation: true,
      })))
      .catch(err => console.error("Error cargando JSON:", err));
  }, []);

  useEffect(() => {
    if (!query || !fuse) return setResults([]);
    const matches = fuse.search(query).map(m => m.item);
    setResults(matches.length ? matches : [{ id: "0", titulo: "No se encontraron resultados" }]);
  }, [query, fuse]);

  return (
    <section className="barra-buscador">
      <div className="barra-contenido">
        <h2 className="titulo-buscador">PlatinumScope - Reviews de mis platinos</h2>
        <div className="buscador-contenedor">
          <input
            type="text"
            className="buscador"
            placeholder="Buscar reviews"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <ul className={`resultados ${results.length ? "visible" : ""}`}>
            {results.map(r => (
              <li key={r.id}>
                {r.id !== "0" ? (
                  <Link to={`/review/${r.id}`}>{r.titulo}</Link>
                ) : r.titulo}
              </li>
            ))}
          </ul>
        </div>
        <ThemeToggle />
      </div>
    </section>
  );
}
