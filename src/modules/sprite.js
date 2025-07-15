// Импорт всех SVG из папки ../icons (относительно расположения sprite.js)
const req = require.context('../icons', false, /\.svg$/);
req.keys().forEach(req);

// Вставка спрайта в DOM
const sprite = require('svg-sprite-loader/runtime/sprite.build');
document.addEventListener('DOMContentLoaded', () => {
  const spriteContainer = document.getElementById('sprite-container');
  spriteContainer.innerHTML = sprite.stringify();
});