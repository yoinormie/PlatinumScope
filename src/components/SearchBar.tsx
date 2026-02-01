import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // IMPORTANTE
import Fuse from "fuse.js";
import type { Review } from "../types/Reviews";
import ThemeToggle from "./ThemeToggle";
import styles from '../styles/modules/searchBar.module.css'

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Review[]>([]);
  const [fuse, setFuse] = useState<Fuse<Review> | null>(null);

  const location = useLocation();

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
    setQuery("");
    setResults([]);
  }, [location.pathname]);

  useEffect(() => {
    if (!query || !fuse) return setResults([]);
    const matches = fuse.search(query).map(m => m.item);
    setResults(matches.length ? matches : [{ id: "0", titulo: "No se encontraron resultados" }]);
  }, [query, fuse]);

  return (
    <section className={styles.barraBuscador}>
      <div className={styles.barraContenido}>
        <h2 className={styles.tituloBuscador}>PlatinumScope - Reviews de mis platinos</h2>
        <div className={styles.buscadorContenedor}>
          <input
            type="text"
            className={styles.buscador}
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
