import type { Opinion } from "../types/Reviews";
import '../review.css'

type Props = { opinion?: Opinion };

export function Opiniones({ opinion }: Props) {
  if (!opinion) return null;

  return (
    <section className="opinion-section">
      <h2>Opinión personal</h2>
      {opinion.historia && <article className="opinion-historia"><h3>Historia</h3><p>{opinion.historia}</p></article>}
      {opinion.logros && <article className="opinion-logros"><h3>Logros</h3><p>{opinion.logros}</p></article>}
      {opinion.mecanicas && <article className="opinion-mecanicas"><h3>Mecánicas</h3><p>{opinion.mecanicas}</p></article>}
      {opinion.conclusiones && <article className="opinion-conclusiones"><h3>Conclusiones</h3><p>{opinion.conclusiones}</p></article>}
    </section>
  );
}
