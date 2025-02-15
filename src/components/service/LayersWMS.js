const L = require("leaflet");
import Hammer from "hammerjs"; // Importar Hammer.js

const authKey = "24218beb-1da6-4f89-9a76-b7c404a5af5b"; // Se recomienda variables de entorno

// Función para cargar una capa WMS
export function loadWMSLayer(map, layerName, wmsUrl, options = {}) {
  const defaultOptions = {
    layers: layerName,
    format: "image/png",
    transparent: true,
    attribution: "Gesstor Services",
    crs: L.CRS.EPSG4326,
    authkey: authKey,
  };

  const layerOptions = { ...defaultOptions, ...options };
  const wmsLayer = L.tileLayer.wms(wmsUrl, layerOptions);
  wmsLayer.addTo(map);
  return wmsLayer;
}

// Función para agregar evento de clic
export function addClickEventToWMS(map, layerName, wmsUrl, handleFeatureInfo) {
  // Función para manejar clic o tap
  const handleMapClick = (e) => {
    const latLng = e.latlng; // Obtiene directamente las coordenadas del mapa

    const mapSize = map.getSize(); // Obtén el tamaño actualizado del mapa
    const bounds = map.getBounds().toBBoxString(); // bbox actualizado

    const params = {
      service: "WMS",
      version: "1.1.1",
      request: "GetFeatureInfo",
      layers: layerName,
      query_layers: layerName,
      info_format: "application/json",
      crs: "EPSG:4326",
      x: e.containerPoint?.x || 0,
      y: e.containerPoint?.y || 0,
      width: mapSize.x, // Tamaño actualizado
      height: mapSize.y,
      bbox: bounds, // bbox actualizado
      authkey: authKey,
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${wmsUrl}?${queryString}`;

    fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          // Llamar la función para manejar la información
          handleFeatureInfo(data.features[0].properties);
        }
      })
      .catch((error) =>
        console.error("Error al obtener la información:", error)
      );
  };

  // Usar Hammer.js para manejar eventos táctiles
  const mapElement = map.getContainer();
  const hammer = new Hammer(mapElement);

  // Función común para mover el mapa a la ubicación seleccionada
  const moveMapToLatLng = (latLng) => {
    map.setView(latLng, map.getZoom(), { animate: true });
  };

  // Detectar tap
  hammer.on("tap", (e) => {
    // Obtener las coordenadas de la posición donde se hizo el tap
    const latLng = map.mouseEventToLatLng(e.originalEvent);

    // Mover el mapa a la posición del tap
    moveMapToLatLng(latLng);

    // Ejecutar la función de clic con las coordenadas del tap
    handleMapClick(e);
  });

  // Manejar clic en dispositivos no táctiles
  map.on("click", (e) => {
    // Mover el mapa a la posición del clic
    moveMapToLatLng(e.latlng);

    // Ejecutar la función de clic con las coordenadas del clic
    handleMapClick(e);
  });
}
