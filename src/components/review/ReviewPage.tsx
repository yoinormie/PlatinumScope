import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Review } from "../../types/Reviews";
import { FichaTecnica } from "./FichaTecnica";
import { Opiniones } from "./Opiniones";
import { Recursos } from "./Recursos";
import { EnlacesCompra } from "./Recursos";
import { Sinopsis } from "./Sinopsis";
import SearchBar from "../SearchBar";
import '../../styles/general/review.css'
import Header from "../Header";

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then(res => res.json())
      .then((data: Review[]) => {
        const found = data.find(r => r.id === id);
        setReview(found || null);
        if (found) document.title = `PlatinumScope - ${found.titulo}`;
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!review) return <p>Review no encontrada.</p>;

  return (
    <>
      <SearchBar />
      <Header />
      <main className="review-container">

        <h1 className="titulo">{review.titulo}</h1>
    
        {review.imagen && (
          <section className="imagen-section">
            <img className="imagen" src={review.imagen} alt={review.titulo} />
          </section>
        )}

        <FichaTecnica ficha={review.ficha_tecnica} />
        <Sinopsis sinopsis={review.ficha_tecnica?.sinopsis} />
        <Opiniones opinion={review.opinion} />
        <Recursos recursos={review.recursos} />
        <EnlacesCompra enlaces={review.enlaces_compra} />
      </main>
    </>
  );
}
