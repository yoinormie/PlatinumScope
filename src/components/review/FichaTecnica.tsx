import type { FichaTecnica, Requisitos } from "../../types/Reviews";
import styles from '../../styles/modules/reviewComponents/fichaTecnica.module.css'

type Props = { ficha?: FichaTecnica };

export function FichaTecnica({ ficha }: Props) {
  if (!ficha) return null;

  const renderRequisitos = (req?: Requisitos, titulo?: string) => {
    if (!req) return null;
    return (
      <>
        <h3>{titulo}</h3>
        <ul>
          {Object.entries(req).map(([k, v]) => v && <li key={k}><strong>{k.toUpperCase()}:</strong> {v}</li>)}
        </ul>
      </>
    );
  };

  return (
    <section className={styles.ficha}>
      <h2>Ficha técnica</h2>
      {renderRequisitos(ficha.requisitos_minimos, "Requisitos mínimos")}
      {renderRequisitos(ficha.requisitos_recomendados, "Requisitos recomendados")}
    </section>
  );
}
