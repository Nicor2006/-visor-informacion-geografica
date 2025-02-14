// Función para crear y mostrar un modal con contenido personalizado
export const showModal = (title, content) => {
  // Si ya hay un modal abierto, elimínalo
  const existingModal = document.getElementById("info-modal");
  if (existingModal) {
    document.body.removeChild(existingModal);
  }

  // Crear el modal
  const modal = document.createElement("div");
  modal.id = "info-modal";
  modal.className = "modal"; // Usará la clase "modal" definida en tu SCSS
  modal.innerHTML = `
      <h3>${title}</h3>
      <div>${content}</div>
    `;

  // Crear botón para cerrar el modal
  const closeButton = document.createElement("button");
  closeButton.textContent = "Cerrar";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  modal.appendChild(closeButton);
  document.body.appendChild(modal);
};
