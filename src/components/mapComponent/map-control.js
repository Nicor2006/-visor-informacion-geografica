import "leaflet/dist/leaflet.css";
import "./map.scss";

const L = require("leaflet");

import { mapa_topografico } from "./layers/control-layers";

export var map = L.map("map", {
  center: [10.4944, -75.1242],
  zoom: 15,
  layers: [mapa_topografico],
});

L.control.zoom({ position: "topright" }).addTo(map);

// scale control
new L.control.scale({ imperial: false }).addTo(map);
