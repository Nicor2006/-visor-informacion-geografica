export function addPrintButton(map) {
  const printButton = L.control({ position: "topright" });

  printButton.onAdd = function () {
    const btn = L.DomUtil.create("button", "print-button");
    btn.textContent = "Imprimir Pantalla";
    btn.style.padding = "10px";
    btn.style.backgroundColor = "#007bff";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "14px";

    btn.addEventListener("click", () => {
      // Redimensionar el mapa para dividirlo antes de imprimir
      const mapContainer = document.getElementById("map");
      mapContainer.classList.add("mapaCompleto");

      // Forzar una actualización del mapa para asegurar que se rendericen ambas mitades
      map.invalidateSize();

      // Llama al cuadro de diálogo de impresión
      setTimeout(() => window.print(), 500); // Añade un pequeño retraso para asegurar la carga completa
    });

    return btn;
  };

  printButton.addTo(map);
}
