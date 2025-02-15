export function addPrintButton(map) {
  const printButton = L.control({ position: "topright" });

  printButton.onAdd = function () {
    const btn = L.DomUtil.create("button", "print-button");
    btn.textContent = "Imprimir Pantalla";

    // Estilos del botón
    btn.style.padding = "10px";
    btn.style.backgroundColor = "#007bff";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "14px";

    // Prevenir que el mapa se mueva al hacer clic en el botón
    L.DomEvent.disableClickPropagation(btn);
    L.DomEvent.disableScrollPropagation(btn);

    // Guardar el estado actual del mapa
    let currentCenter;
    let currentZoom;

    btn.addEventListener("click", (e) => {
      // Prevenir cualquier comportamiento predeterminado
      e.preventDefault();
      e.stopPropagation();

      // Guardar el estado actual del mapa
      currentCenter = map.getCenter();
      currentZoom = map.getZoom();

      const mapContainer = document.getElementById("map");
      mapContainer.classList.add("mapaCompleto");

      // Asegurar que el mapa se mantenga en la misma posición
      map.invalidateSize({
        animate: false,
        pan: false,
      });

      // Forzar el mapa a mantener su posición
      map.setView(currentCenter, currentZoom, {
        animate: false,
      });

      // Esperar a que todo esté listo antes de imprimir
      setTimeout(() => {
        map.setView(currentCenter, currentZoom, {
          animate: false,
        });

        window.print();

        // Restaurar después de imprimir
        setTimeout(() => {
          mapContainer.classList.remove("mapaCompleto");
          map.invalidateSize({
            animate: false,
            pan: false,
          });
          // Asegurar que el mapa vuelva a su posición original
          map.setView(currentCenter, currentZoom, {
            animate: false,
          });
        }, 500);
      }, 500);
    });

    return btn;
  };

  printButton.addTo(map);
}
