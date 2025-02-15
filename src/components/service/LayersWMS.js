export function addClickEventToWMS(map, layerName, wmsUrl, handleFeatureInfo) {
  // Manejador de clic en el mapa
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
      x: e.containerPoint.x,
      y: e.containerPoint.y,
      width: mapSize.x, // Tamaño actualizado
      height: mapSize.y,
      bbox: bounds, // bbox actualizado
      authkey: authKey,
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${wmsUrl}?${queryString}`;

    // Hacer la solicitud de la capa WMS
    fetch(fullUrl)
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

  // Configuramos el evento de tap en Hammer.js
  hammer.on("tap", (e) => {
    handleMapClick(e); // Ejecutar el clic en el mapa cuando se hace tap
  });

  // También agregamos el evento de clic en Leaflet (para otros dispositivos)
  map.on("click", handleMapClick);
}
