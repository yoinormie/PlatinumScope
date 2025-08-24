const params = new URLSearchParams(window.location.search);
const juegoId = params.get("id") || null;

fetch("../data/reviews.json")
  .then(res => res.json())
  .then(data => {
    const juego = data.find(j => j.id === juegoId);
    if (!juego) {
      document.querySelector(".review-container").innerHTML = "<p>Review no encontrada.</p>";
      return;
    }

    //Título pestaña
    document.title = document.title + " - " + (juego.titulo || "Sin título");


    // Título
    document.querySelectorAll(".titulo").forEach(el => el.textContent = juego.titulo || "Sin título");

    //Imagen juego
    const img = document.querySelector(".imagen");
    if (juego.imagen) {
      img.src = juego.imagen;
      img.alt = juego.titulo || "Imagen del juego";
    } else {
      img.style.display = "none";
    }

    // Ficha técnica: mínimos
    const minList = document.querySelector(".ficha-minimos");
    minList.innerHTML = "";
    if (juego.ficha_tecnica?.requisitos_minimos) {
      const req = juego.ficha_tecnica.requisitos_minimos;
      const hayDatos = Object.values(req).some(v => v);
      if (hayDatos) {
        const h3 = document.createElement("h3");
        h3.textContent = "Requisitos mínimos";
        minList.appendChild(h3);

        for (const [key, value] of Object.entries(req)) {
          if (value) {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${key.toUpperCase()}:</strong> ${value}`;
            minList.appendChild(li);
          }
        }
      }
    }

    // Ficha técnica: recomendados
    const recList = document.querySelector(".ficha-recomendados");
    recList.innerHTML = "";
    if (juego.ficha_tecnica?.requisitos_recomendados) {
      const req = juego.ficha_tecnica.requisitos_recomendados;
      const hayDatos = Object.values(req).some(v => v);
      if (hayDatos) {
        const h3 = document.createElement("h3");
        h3.textContent = "Requisitos recomendados";
        recList.appendChild(h3);

        for (const [key, value] of Object.entries(req)) {
          if (value) {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${key}:</strong> ${value}`;
            recList.appendChild(li);
          }
        }
      }
    }

    // Sinopsis (dentro de ficha_tecnica según tu JSON)
    const sinopsis = document.querySelector(".sinopsis");
    if (juego.ficha_tecnica?.sinopsis) {
      const sinopsisText =  juego.ficha_tecnica.sinopsis.replace(/\n/g, "<br>");
      sinopsis.innerHTML = sinopsisText;
    }

    // Opiniones
    if (juego.opinion) {
      const o = juego.opinion;
      const historia = o.historia ? o.historia.replace(/\n/g, "<br>") : "";
      document.querySelector(".opinion-historia").innerHTML = o.historia ? `<h3>Historia</h3><p>${historia}</p>` : "";
      const logros = o.logros ? o.logros.replace(/\n/g, "<br>") : "";
      document.querySelector(".opinion-logros").innerHTML = o.logros ? `<h3>Logros</h3><p>${logros}</p>` : "";
      const mecanicas = o.mecanicas ? o.mecanicas.replace(/\n/g, "<br>") : "";
      document.querySelector(".opinion-mecanicas").innerHTML = o.mecanicas ? `<h3>Mecánicas</h3><p>${mecanicas}</p>` : "";
      // Reemplazo saltos de línea en conclusiones
      const conclusiones = o.conclusiones ? o.conclusiones.replace(/\n/g, "<br>") : "";
      document.querySelector(".opinion-conclusiones").innerHTML = o.conclusiones
        ? `<h3>Conclusiones</h3><p>${conclusiones}</p>`
        : "";
    }

    //Recursos
    const recursos = document.querySelector(".recursos-lista");
    recursos.innerHTML = "";
    if (juego.recursos?.length) {
      juego.recursos.forEach(r => {
        const li = document.createElement("li");
        if (r.tipo === "video") {
          li.innerHTML = `<a href="${r.url}" target="_blank" rel="noopener noreferrer">🎥 ${r.titulo || "Video"}</a>`;
        } else if (r.tipo === "articulo") {
          li.innerHTML = `<a href="${r.url}" target="_blank" rel="noopener noreferrer">📰 ${r.titulo || "Artículo"}</a>`;
        } else {
          li.innerHTML = `<a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.titulo || "Recurso"}</a>`;
        }
        recursos.appendChild(li);
      });
    }

    // Enlaces de compra
    const enlaces = document.querySelector(".enlaces-lista");
    enlaces.innerHTML = "";
    if (juego.enlaces_compra?.length) {
      // Solo creamos el título si hay enlaces
      const h3 = document.createElement("h3");
      //h3.textContent = "Comprar en:";
      enlaces.parentNode.insertBefore(h3, enlaces); // Insertar antes de la lista

      juego.enlaces_compra.forEach(enlace => {
        // Cambié enlace.url por enlace.enlace (como en tu JSON)
        if (enlace.enlace && enlace.plataforma) {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${enlace.enlace}" target="_blank" rel="noopener noreferrer">${enlace.plataforma}</a>`;
          enlaces.appendChild(li);
        }
      });
    }

  })
  .catch(err => {
    console.error("Error al cargar el JSON:", err);
    document.querySelector(".review-container").innerHTML = "<p>Error al cargar los datos.</p>";
  });
