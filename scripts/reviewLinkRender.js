const enlaces = review.enlaces;
let linksHtml = "<ul>";

enlaces.forEach(link => {
  linksHtml += `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.nombre}</a></li>`;
});

linksHtml += "</ul>";
document.getElementById("enlaces-utiles").innerHTML = linksHtml;
