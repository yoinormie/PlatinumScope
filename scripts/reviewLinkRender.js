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
            li.innerHTML = `<strong>${key.toUpperCase()}:</strong> ${value}`;
            recList.appendChild(li);
          }
        }
      }
    }

    // Sinopsis (dentro de ficha_tecnica según tu JSON)
    const sinopsis = document.querySelector(".sinopsis");
    if (juego.ficha_tecnica?.sinopsis) {
      const sinopsisText = juego.ficha_tecnica.sinopsis.replace(/\n/g, "<br>");
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

    // ---------- RECURSOS (reemplaza tu bloque actual) ----------
    const recursosSection = document.querySelector(".recursos");
    if (!recursosSection) {
      console.warn("No existe .recursos en el DOM");
    } else {
      // busca un contenedor ya creado o lo crea
      let recursosContainer = recursosSection.querySelector(".recursos-contenedor");
      if (!recursosContainer) {
        recursosContainer = document.createElement("div");
        recursosContainer.className = "recursos-contenedor";
        recursosSection.appendChild(recursosContainer);
      }
      recursosContainer.innerHTML = "";

      if (!Array.isArray(juego.recursos) || juego.recursos.length === 0) {
        console.info("Este juego no tiene recursos: ", juego.id);
        recursosSection.style.display = "none";
      } else {
        recursosSection.style.display = ""; // aseguramos visible
        for (const raw of juego.recursos) {
          const r = normalizeRecurso(raw);
          console.log("Recurso normalizado:", r);

          const card = document.createElement("article");
          card.className = "recurso-card";

          //const heading = document.createElement("h4");
          //heading.textContent = `${iconForTipo(r.tipo)} ${r.titulo || (r.tipo === "video" ? "Video" : "Artículo")}`;
          //card.appendChild(heading);


          // Si es vídeo y es YouTube -> embeber, si no -> enlace
          if (r.tipo === "video") {
            const yt = extractYouTubeId(r.url);
            if (yt) {
              const iframe = document.createElement("iframe");
              iframe.width = "560";
              iframe.height = "315";
              iframe.src = `https://www.youtube.com/embed/${yt}`;
              iframe.title = r.titulo || "Video";
              iframe.setAttribute("frameborder", "0");
              iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
              iframe.allowFullscreen = true;
              card.appendChild(iframe);
            } else {
              // no es YouTube: mostrar enlace directo
              const a = document.createElement("a");
              a.href = r.url || "#";
              a.target = "_blank";
              a.rel = "noopener noreferrer";
              a.textContent = "Ver vídeo (enlace)";
              card.appendChild(a);
            }
          } else {
            // artículo / otro: link
            const a = document.createElement("a");
            a.href = r.url || "#";
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.textContent = r.tipo === "articulo" || r.tipo === "artículo" ? "Leer artículo" : "Ver recurso";
            card.appendChild(a);
          }
          if (r.autor) {
            const autorEl = document.createElement("p");
            autorEl.className = "recurso-autor";
            autorEl.textContent = `Autor: ${r.autor}`;
            card.appendChild(autorEl);
          }
          recursosContainer.appendChild(card);
        }
      }
    }

    /* ---------- Helpers (idénticas a las anteriores) ---------- */
    function normalizeRecurso(raw) {
      const url = (raw.url || raw.enlace || raw.link || "").trim();
      const titulo = (raw.titulo || raw.title || raw.nombre || "").trim();
      const tipo = (raw.tipo || "").toLowerCase().trim();
      const autor = (raw.autor || raw.author || "").trim();
      return { url, titulo, tipo, autor };
    }

    function iconForTipo(tipo) {
      if (tipo === "video") return "🎥";
      if (tipo === "articulo" || tipo === "artículo") return "📰";
      return "🔗";
    }

    function extractYouTubeId(u) {
      if (!u) return null;
      try {
        const url = new URL(u);
        if (url.hostname === "youtu.be") return url.pathname.slice(1).split("?")[0];
        if (url.hostname.includes("youtube.com")) {
          if (url.searchParams.get("v")) return url.searchParams.get("v");
          const parts = url.pathname.split("/");
          return parts.includes("embed") ? parts.pop() : (parts.includes("shorts") ? parts.pop() : null);
        }
      } catch (e) {
        // no es URL válida (quizá passed plain id) -> intentar patrón simple
        const m = u.match(/(?:v=|\/embed\/|youtu\.be\/|\/shorts\/)([A-Za-z0-9_-]{6,})/);
        return m ? m[1] : null;
      }
      return null;
    }


    // Enlaces de compra
    const enlaces = document.querySelector(".enlaces-lista");
    //enlaces.innerHTML = "";
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
