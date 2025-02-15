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

// Función para agregar evento de clic y manejar la información de la capa WMS
export function addClickEventToWMS(map, layerName, wmsUrl, handleFeatureInfo) {
  let currentLayer = null; // Variable para almacenar la capa WMS actual

  // Función para limpiar la capa WMS previamente cargada
  const clearPreviousLayer = () => {
    if (currentLayer) {
      map.removeLayer(currentLayer); // Eliminar la capa anterior del mapa
      currentLayer = null; // Limpiar la referencia a la capa
    }
  };

  const handleMapClick = (e) => {
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
          handleFeatureInfo(data.features[0].properties);
          clearPreviousLayer();
          currentLayer = loadWMSLayer(map, layerName, wmsUrl); // Cargar una nueva capa
        }
      })
      .catch((error) =>
        console.error("Error al obtener la información:", error)
      );
  };

  // Usar Hammer.js para manejar eventos táctiles (móviles)
  const mapElement = map.getContainer();
  const hammer = new Hammer(mapElement);

  // Configuramos el evento de tap en Hammer.js
  hammer.on("tap", (e) => {
    handleMapClick(e); // Ejecutar el clic en el mapa cuando se hace tap
  });

  // También agregamos el evento de clic en Leaflet (para otros dispositivos)
  map.on("click", handleMapClick);
}
