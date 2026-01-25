import styles from '../../styles/modules/reviewComponents/sinopsis.module.css'

type Props = { sinopsis?: string };

export function Sinopsis({ sinopsis }: Props) {
  if (!sinopsis) return null;

  return (
    <section className={styles.opinionSection}>
      <h2>Sinopsis</h2>
      <p className={styles.sinopsis}>{sinopsis}</p>
    </section>
  );
}