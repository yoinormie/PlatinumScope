const input = document.querySelector(".buscador");
const resultados = document.querySelector(".resultados");
let fuse = null;

// Cargar JSON y configurar Fuse
fetch('../data/reviews.json')
  .then(res => res.json())
  .then(data => {
    fuse = new Fuse(data, {
      keys: ['titulo'],
      threshold: 0.4,
      ignoreLocation: true
    });
  })
  .catch(err => console.error("Error cargando el JSON:", err));

// Mostrar resultados al escribir
input.addEventListener("input", () => {
  const query = input.value.trim();
  resultados.innerHTML = "";

  if (!query || !fuse) {
    resultados.classList.remove("visible");
    return;
  }

  const matches = fuse.search(query);

  if (matches.length === 0) {
    resultados.innerHTML = "<li>No se encontraron resultados.</li>";
  } else {
    matches.forEach(match => {
      const review = match.item;
      const li = document.createElement("li");

      // Aquí generas un enlace con un parámetro en la URL (usando un campo como "id" o "slug")
      const a = document.createElement("a");
      a.href = `../templates/review.html?id=${review.id}`;
      a.textContent = review.titulo + (review.descripcion ? ` — ${review.descripcion}` : "");
      a.style.textDecoration = "none"; // opcional
      a.style.color = "inherit"; // opcional para mantener el estilo del texto

      li.appendChild(a);
      resultados.appendChild(li);
    });

  }

  resultados.classList.add("visible"); // mostrar resultados si hay input
});

// Mostrar resultados al hacer foco si hay texto
input.addEventListener("focus", () => {
  if (input.value.trim() !== "" && resultados.children.length > 0) {
    resultados.classList.add("visible");
  }
});

// Ocultar cuando se hace blur (clic fuera del input)
input.addEventListener("blur", () => {
  // Esperar brevemente por si se hace clic en un <li>
  setTimeout(() => resultados.classList.remove("visible"), 150);
});
