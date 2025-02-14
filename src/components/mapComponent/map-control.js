import "leaflet/dist/leaflet.css";
import "./map.scss";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen";
import { AwesomeMarkersIcon } from "./controls/icons/famIcon";

const L = require("leaflet");
import { mapa_topografico } from "./layers/control-layers";
import { dynamicMarker } from "./controls/markers";

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

//Control de pantalla completa
L.control.fullscreen({ position: "topleft" }).addTo(map);

//Se crea el marcador
const awesomeIcon = AwesomeMarkersIcon("fa", "heart", "red");

//Marcador en el centro de Replon
dynamicMarker(awesomeIcon, [10.4935, -75.124], 25).addTo(map);
