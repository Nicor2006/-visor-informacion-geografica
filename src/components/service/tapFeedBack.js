export function createTapFeedback(x, y, element) {
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

  element.appendChild(dot);

  setTimeout(() => {
    dot.style.opacity = "0";
    setTimeout(() => dot.remove(), 300);
  }, 200);
}
