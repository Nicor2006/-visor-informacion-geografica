const L = require("leaflet");
import "leaflet-marker-rotation/src/rotatedMarker";

//Permite rotar un Marker

export var dynamicMarker = (icono, coords, angle) => {
  return L.rotatedMarker(coords, {
    icon: icono,
    rotationOrigin: "center",
    rotationAngle: angle,
  });
};
