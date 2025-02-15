import L from "leaflet";

//BASEMAPS
//Layers standar
export var standard_osm = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { attribution: "©OpenStreetMap, ©Standard", minZoom: 0, maxZoom: 24 }
);
export var standard_osm_mm = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { attribution: "©OpenStreetMap, ©Standard", minZoom: 0, maxZoom: 24 }
);

//Layer clara
export var carto_light = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { attribution: "©OpenStreetMap, ©CartoDB", subdomains: "abcd", maxZoom: 24 }
);

//Layer topografica
export var mapa_topografico = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  { attribution: "©OpenStreetMap, ©Standard", minZoom: 0, maxZoom: 24 }
);
