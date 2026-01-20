import type { Recurso, EnlaceCompra } from "../types/Reviews";
import '../review.css'

export function Recursos({ recursos }: { recursos?: Recurso[] }) {
  if (!recursos || recursos.length === 0) return null;
  return (
    <section className="recursos">
      <h2>Recursos</h2>
      <div className="recursos-contenedor">
        {recursos.map((r, i) => (
          <article className="recurso-card" key={i}>
            {r.tipo === "video" && r.enlace ? (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${new URL(r.enlace).pathname.split("/").pop()}`}
                title={r.titulo || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <a href={r.enlace} target="_blank" rel="noopener noreferrer">{r.titulo || "Ver recurso"}</a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function EnlacesCompra({ enlaces }: { enlaces?: EnlaceCompra[] }) {
  if (!enlaces || enlaces.length === 0) return null;
  return (
    <section className="enlaces">
      <h2>Comprar</h2>
      <ul className="enlaces-lista">
        {enlaces.map((e, i) => (
          <li key={i}><a href={e.enlace} target="_blank" rel="noopener noreferrer">{e.plataforma}</a></li>
        ))}
      </ul>
    </section>
  );
}
