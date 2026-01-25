import type { Opinion } from "../../types/Reviews";
import styles from '../../styles/modules/reviewComponents/opinion.module.css'

type Props = { opinion?: Opinion };

export function Opiniones({ opinion }: Props) {
  if (!opinion) return null;

  return (
    <section className={styles.opinionSection}>
      <h2>Opinión personal</h2>
      {opinion.historia && <article className={styles.opinionHistoria}><h3>Historia</h3><p>{opinion.historia}</p></article>}
      {opinion.logros && <article className={styles.opinionLogros}><h3>Logros</h3><p>{opinion.logros}</p></article>}
      {opinion.mecanicas && <article className={styles.opinionMecanicas}><h3>Mecánicas</h3><p>{opinion.mecanicas}</p></article>}
      {opinion.conclusiones && <article className={styles.opinionConclusiones}><h3>Conclusiones</h3><p>{opinion.conclusiones}</p></article>}
    </section>
  );
}
