import "leaflet/dist/leaflet.css";
import "./map.scss";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen";
import { AwesomeMarkersIcon } from "../markers/icons/famIcon";
import { loadWMSLayer, addClickEventToWMS } from "../service/LayersWMS";
import { showModal } from "../service/modal";
import { addPrintButton } from "../service/printButton";
import {
  standard_osm,
  carto_light,
  mapa_topografico,
  standard_osm_mm,
} from "../layers/control-layers.js";

const L = require("leaflet");

// Inicializar el mapa principal
export var map = L.map("map", {
  center: [10.4944, -75.1242],
  zoom: 15,
  layers: [mapa_topografico],
});

// Definir las capas base
const baseMaps = {
  "Mapa Topográfico": mapa_topografico,
  "Mapa OSM Estándar": standard_osm,
  "Mapa OSM Estándar (MM)": standard_osm_mm,
  "Carto Light": carto_light,
};

// Definir las superposiciones (WMS)
const overlayMaps = {
  "Terreno (LC)": loadWMSLayer(
    map,
    "repelon:lc_terreno",
    "https://gesstorservices.com/geoserver/repelon/wms"
  ),
  "Sector Rural (CC)": loadWMSLayer(
    map,
    "repelon:cc_sectorrural",
    "https://gesstorservices.com/geoserver/repelon/wms"
  ),
};

// Control de capas al mapa
L.control
  .layers(baseMaps, overlayMaps, {
    position: "topleft",
  })
  .addTo(map);

// Control de zoom
L.control.zoom({ position: "topright" }).addTo(map);

// Control de escala
new L.control.scale({ imperial: false }).addTo(map);

// Se crea el marcador
const awesomeIcon = AwesomeMarkersIcon("fa", "heart", "red");
L.marker([10.4935, -75.124], { icon: awesomeIcon }).addTo(map);

// Evento de clic para mostrar información del terreno
addClickEventToWMS(
  map,
  "repelon:lc_terreno",
  "https://gesstorservices.com/geoserver/repelon/wms",
  (featureProperties) => {
    const { etiqueta, area_terreno } = featureProperties;
    const modalContent = `
      <p><strong>Etiqueta:</strong> ${etiqueta}</p>
      <p><strong>Área del terreno:</strong> ${area_terreno} m²</p>
    `;
    showModal("Información del Terreno", modalContent);
  }
);

// Agregar el botón de impresión
addPrintButton(map);
