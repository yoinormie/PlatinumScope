import type { Recurso, EnlaceCompra } from "../../types/Reviews";
import styles from '../../styles/modules/reviewComponents/recursos.module.css'

export function Recursos({ recursos }: { recursos?: Recurso[] }) {
  if (!recursos || recursos.length === 0) return null;
  return (
    <section className={styles.recursos}>
      <h2>Recursos</h2>

      <div className={styles.recursosContenedor}>
        {recursos.map((r, i) => (
          <article className={styles.recursoCard} key={i}>
            {r.tipo === "video" && r.enlace ? (
              // ---- VIDEO ----
              <iframe
                width="23vw"
                height="30vh"
                src={`https://www.youtube.com/embed/${new URL(r.enlace).pathname.split("/").pop()}`}
                title={r.titulo || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              // ---- ARTÍCULO / OPENGRAPH ----
              <div className={styles.articuloPreview}>
                {r.imagen && (
                  <img
                    src={r.imagen}
                    alt={r.titulo || "Imagen del artículo"}
                  />
                )}

                {r.titulo && <h3>{r.titulo}</h3>}

                {r.snippet && <p>{r.snippet}</p>}

                <a
                  href={r.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Leer artículo completo
                </a>
              </div>
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
    <section className={styles.enlaces}>
      <h2>Comprar</h2>
      <ul className={styles.enlacesLista}>
        {enlaces.map((e, i) => (
          <li key={i}><a href={e.enlace} target="_blank" rel="noopener noreferrer">{e.plataforma}</a></li>
        ))}
      </ul>
    </section>
  );
}
