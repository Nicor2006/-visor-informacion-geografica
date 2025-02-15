import "leaflet/dist/leaflet.css";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";

const L = require("leaflet");
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";

//Crea un icono sencillo

export var AwesomeMarkersIcon = (prefix, icon, color) => {
  return L.AwesomeMarkers.icon({
    prefix: prefix,
    icon: icon,
    markerColor: color,
  });
};
