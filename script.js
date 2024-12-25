const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const numLights = 50;
const lights = [];

// Generate random colors
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Create light objects
for (let i = 0; i < numLights; i++) {
  lights.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 10 + 5,
    color: getRandomColor(),
    alpha: 1,
    twinkleSpeed: Math.random() * 0.05 + 0.01
  });
}

function drawLights() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  for (let i = 0; i < numLights; i++) {
    const light = lights[i];
    ctx.beginPath();
    ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
    ctx.fillStyle = light.color;
    ctx.globalAlpha = light.alpha;
    ctx.fill();
  }
}

function twinkle() {
  for (let i = 0; i < numLights; i++) {
    const light = lights[i];
    light.alpha += light.twinkleSpeed;
    if (light.alpha > 1 || light.alpha < 0.5) {
      light.twinkleSpeed = -light.twinkleSpeed;
    }
  }

  drawLights();
  requestAnimationFrame(twinkle);
}

twinkle(); // Start the animation loop