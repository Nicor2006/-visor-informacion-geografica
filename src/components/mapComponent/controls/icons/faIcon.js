const L = require("leaflet");

export var faIcon = (url, size, className) =>
  L.divIcon({
    html: url,
    iconSize: size,
    className: className,
  });
