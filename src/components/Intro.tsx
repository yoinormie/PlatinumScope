import '../styles/general/index.css';

function Intro() {
  return (
    <section className="intro">
      <h1 className="titulo-intro">Sobre la PlatinumScope</h1>

      <article>
        <h2>Introducción</h2>
        <p>
          Muy buenas a todos los que están interesados en los platinos, porque
          en esta web solo hablamos de aquellos juegos los cuales ya tengo
          todos los trofeos.
        </p>
      </article>

      <article>
        <h2>¿Quien eres?</h2>
        <p>
          Yo solo soy un programador junior con ganas de conseguir platinos, y
          no hay mejor manera de mostrar mi entusiasmo con ello que contándoselo
          a gente y mejorar el portfolio.
        </p>
      </article>

      <article>
        <h2>¿Qué tiene de especial esta web?</h2>
        <p>
          La verdad es que no tiene mucho. Mi objetivo principal es motivarme
          a hacer proyectos personales de temáticas que me gustan, pero sin
          dejar de mejorar mi portfolio ni mis habilidades de programador.
        </p>
        <br/>
        <p>
          Lo único que sí que os puede ser útil es mi experiencia jugando y
          platinando los juegos que tengo (y así veis si os compensa
          comprarlo/platinarlo).
        </p>
      </article>

      <article className="articles">
        <h2>¿Qué es lo que te vas a encontrar en cada artículo?</h2>
        <p>
          En cada artículo habrá una descripción técnica de juego (desarrolladores,
          requisitos, plataformas, etc..), enlaces para comprarlo en diferentes
          plataformas, mi opinión sobre el juego en sí (historia, mecánicas, etc...)
          como de la odisea de conseguir su platino.
        </p>
        <p>
          Echaremos un vistazo sobre los dlc (si se da el caso) y discutiremos si
          son recomendables o no y si son necesarios para la obtención del platino.
        </p>
        <p>
          También dejaré los recursos que me ayudaron a mí (si los autores de dichos
          recursos están de acuerdo) y algunos enlaces más hacia webs que también os
          ayuden a conseguir ese objetivo.
        </p>
      </article>

      <aside className="disclaimer">
        <p>
          Dicho todo esto, creo que no hace falta recordar que en cada artículo
          habrá spoilers de los juegos y opiniones personales acerca de mi
          experiencia con x juego. No intento hacer que nadie se sienta
          ofendido porque haya criticado mal a su juego favorito, asi que por favor,
          <strong> no me deis la vara con eso ni me insulteis ni nada de eso</strong>.
        </p>
        <p>
          Bueno, después de este pequeño disclaimer (algo necesario, viendo como
          está la gente por internet) te animo a que leas los artículos de esta web :).
        </p>
      </aside>
    </section>
  );
}

export default Intro;
