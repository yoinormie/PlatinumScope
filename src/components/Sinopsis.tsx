import '../review.css'

type Props = { sinopsis?: string };

export function Sinopsis({ sinopsis }: Props) {
  if (!sinopsis) return null;

  return (
    <section className="opinion-section">
      <h2>Sinopsis</h2>
      <p className="sinopsis">{sinopsis}</p>
    </section>
  );
}