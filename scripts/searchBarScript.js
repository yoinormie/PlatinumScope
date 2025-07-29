const input = document.querySelector(".buscador"); // get single element
const resultados = document.querySelector(".resultados");
let reviews = []; // para guardar los datos del JSON
let fuse; // instancia de Fuse

// Cargar los datos del JSON
fetch('../data/reviews.json')
  .then(res => res.json())
  .then(data => {
    reviews = data;

    // Crear Fuse con opciones
    fuse = new Fuse(reviews, {
      keys: ['titulo'], // puedes añadir más campos como 'descripcion'
      threshold: 0.4,   // cuanto más bajo, más estricta la búsqueda
      ignoreLocation: true
    });
  })
  .catch(err => console.error("Error cargando el JSON:", err));

// Buscar cuando el usuario escribe
input.addEventListener("input", () => {
  const query = input.value.trim();

  resultados.innerHTML = ""; // limpia resultados anteriores

  if (!query || !fuse) return;

  const matches = fuse.search(query);

  if (matches.length === 0) {
    resultados.innerHTML = "<li>No se encontraron resultados.</li>";
    return;
  }

  matches.forEach(match => {
    const review = match.item;
    const li = document.createElement("li");
    li.textContent = review.titulo + (review.descripcion ? ` — ${review.descripcion}` : "");
    resultados.appendChild(li);
  });
});
