import "leaflet/dist/leaflet.css";
import "./map.scss";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen";
import { AwesomeMarkersIcon } from "./controls/icons/famIcon";
import { loadWMSLayer, addClickEventToWMS } from "./layers/service/LayersWMS";
import { mapa_topografico } from "./layers/control-layers";

const L = require("leaflet");

// Inicializar el mapa principal
export var map = L.map("map", {
  center: [10.4944, -75.1242],
  zoom: 15,
  layers: [mapa_topografico],
});

// Control de zoom
L.control.zoom({ position: "topright" }).addTo(map);

// Control de escala
new L.control.scale({ imperial: false }).addTo(map);

// Control de pantalla completa
L.control.fullscreen({ position: "topleft" }).addTo(map);

// Se crea el marcador
const awesomeIcon = AwesomeMarkersIcon("fa", "heart", "red");
L.marker([10.4935, -75.124], { icon: awesomeIcon }).addTo(map);

// Cargar capa lc_terreno
const lcTerrenoLayer = loadWMSLayer(
  map,
  "repelon:lc_terreno",
  "https://gesstorservices.com/geoserver/repelon/wms"
);

// Evento de clic para mostrar información del terreno
addClickEventToWMS(
  map,
  "repelon:lc_terreno",
  "https://gesstorservices.com/geoserver/repelon/wms",
  (featureProperties) => {
    const { etiqueta, area_terreno } = featureProperties;

    // Crear el contenido del modal
    const modalContent = `
      <div>
        <h3>Información del Terreno</h3>
        <p><strong>Etiqueta:</strong> ${etiqueta}</p>
        <p><strong>Área del terreno:</strong> ${area_terreno} m²</p>
      </div>
    `;

    // Mostrar modal
    const modal = document.createElement("div");
    modal.id = "info-modal";
    modal.className = "modal";
    modal.innerHTML = modalContent;

    // Agregar botón para cerrar el modal
    const closeButton = document.createElement("button");
    closeButton.textContent = "×"; // Botón de cierre
    closeButton.className = "modal-close-button"; // Clase para estilo
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
    modal.appendChild(closeButton);

    // Mostrar el modal en el DOM
    document.body.appendChild(modal);
  }
);
