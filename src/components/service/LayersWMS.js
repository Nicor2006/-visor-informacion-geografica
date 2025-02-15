export function addClickEventToWMS(map, layerName, wmsUrl, handleFeatureInfo) {
  let activeLayerRequest = null; // Variable para almacenar la solicitud activa

  const handleMapClick = (e) => {
    // Si hay una solicitud activa anterior, la cancelamos (abortar la solicitud)
    if (activeLayerRequest) {
      activeLayerRequest.abort();
    }

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

    // Hacer la solicitud de la capa WMS y almacenar la solicitud activa
    activeLayerRequest = fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          handleFeatureInfo(data.features[0].properties); // Muestra la información
        }
      })
      .catch((error) =>
        console.error("Error al obtener la información:", error)
      );
  };

  // Usar Hammer.js para manejar eventos táctiles (móviles)
  const mapElement = map.getContainer();
  const hammer = new Hammer(mapElement);

  // Ejecutar el clic en el mapa cuando se hace tap
  hammer.on("tap", (e) => {
    handleMapClick(e);
  });

  // También agregamos el evento de clic en Leaflet (para otros dispositivos)
  map.on("click", handleMapClick);

  // Limpiar el estado de la solicitud cuando el mapa se mueva
  map.on("moveend", () => {
    activeLayerRequest = null;
  });
}
