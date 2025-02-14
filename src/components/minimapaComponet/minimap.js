import "leaflet/dist/leaflet.css";
import "leaflet-minimap/dist/Control.MiniMap.min.css";

const L = require("leaflet");
import "leaflet-minimap";
import { map } from "../mapComponent/map-control";
import { standard_osm_mm } from "../layers/control-layers";

// Agregar el minimapa al mapa principal
export var minimap = new L.Control.MiniMap(standard_osm_mm, {
  toggleDisplay: true,
  minimized: true,
  position: "bottomleft",
});

minimap.addTo(map);
