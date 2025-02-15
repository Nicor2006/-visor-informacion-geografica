const L = require("leaflet");
import Hammer from "hammerjs";

const authKey = "24218beb-1da6-4f89-9a76-b7c404a5af5b";

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

export function addClickEventToWMS(map, layerName, wmsUrl, handleFeatureInfo) {
  const getWMSInfo = (x, y) => {
    const mapSize = map.getSize();
    const bounds = map.getBounds().toBBoxString();

    const params = {
      service: "WMS",
      version: "1.1.1",
      request: "GetFeatureInfo",
      layers: layerName,
      query_layers: layerName,
      info_format: "application/json",
      crs: "EPSG:4326",
      x: Math.round(x),
      y: Math.round(y),
      width: mapSize.x,
      height: mapSize.y,
      bbox: bounds,
      authkey: authKey,
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${wmsUrl}?${queryString}`;

    fetch(fullUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.features && data.features.length > 0) {
          handleFeatureInfo(data.features[0].properties);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la información:", error);
      });
  };

  // Manejo de eventos táctiles
  const mapElement = map.getContainer();

  try {
    // Inicializar Hammer con opciones básicas
    const mc = new Hammer(mapElement);

    // Configurar reconocimiento de tap
    mc.add(new Hammer.Tap({ event: "tap" }));

    // Escuchar evento tap
    mc.on("tap", (ev) => {
      const rect = mapElement.getBoundingClientRect();
      const x = ev.center.x - rect.left;
      const y = ev.center.y - rect.top;

      // Mostrar feedback visual simple
      const dot = document.createElement("div");
      dot.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        opacity: 1;
        transition: opacity 0.3s ease-out;
      `;

      mapElement.appendChild(dot);
      setTimeout(() => {
        dot.style.opacity = "0";
        setTimeout(() => dot.remove(), 300);
      }, 200);

      getWMSInfo(x, y);
    });
  } catch (error) {
    console.error("Error al inicializar Hammer.js:", error);
    // Fallback a eventos de clic normales si Hammer falla
    mapElement.addEventListener("click", (e) => {
      const rect = mapElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      getWMSInfo(x, y);
    });
  }

  // Mantener el evento de clic normal para dispositivos no táctiles
  map.on("click", (e) => {
    getWMSInfo(e.containerPoint.x, e.containerPoint.y);
  });
}
