const L = require("leaflet");

// Definir la authkey
const authKey = "24218beb-1da6-4f89-9a76-b7c404a5af5b"; // se usa asi para que funcione, pero es recomendable usar las variables de entorno

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

// Función para agregar evento de clic y mostrar información del terreno
export function addClickEventToWMS(map, layerName, wmsUrl, handleFeatureInfo) {
  map.on("click", function (e) {
    const params = {
      service: "WMS",
      version: "1.1.1",
      request: "GetFeatureInfo",
      layers: layerName,
      query_layers: layerName,
      info_format: "application/json",
      crs: "EPSG:4326",
      x: e.containerPoint.x,
      y: e.containerPoint.y,
      width: map.getSize().x,
      height: map.getSize().y,
      bbox: map.getBounds().toBBoxString(),
      authkey: authKey,
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${wmsUrl}?${queryString}`;

    fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          handleFeatureInfo(data.features[0].properties);
        }
      })
      .catch((error) =>
        console.error("Error al obtener la información:", error)
      );
  });
}
