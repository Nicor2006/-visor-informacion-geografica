import "leaflet/dist/leaflet.css";
const L = require("leaflet");

export var imgIcon = (icon, sizeIcon) => {
  return L.icon({
    iconUrl: icon,
    iconSize: sizeIcon, // size of the icon
  });
};
