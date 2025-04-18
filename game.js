const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Game settings
const levelWidth = 1280;  // The width of the level (larger than canvas width)
const cameraSpeed = 4;    // Camera speed when player hits the right wall

// Input keys
const keys = {};
document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

// Player properties
const player = {
  x: 50,               // Player's starting X position
  y: 0,                // Player's starting Y position
  width: 32,           // Player's width
  height: 32,          // Player's height
  vx: 0,               // Horizontal velocity
  vy: 0,               // Vertical velocity
  speed: 5,            // Speed of the player
  jumpPower: -10,      // Jumping power
  onGround: false      // Whether the player is on the ground
};

// Physics constants
const gravity = 0.5;
const floor = canvas.height - 40;

// Camera properties
let cameraX = 0;   // Starting position of the camera

// Update function to manage player movement
function update() {
  // Horizontal movement
  player.vx = 0;
  if (keys['ArrowLeft']) player.vx = -player.speed;
  if (keys['ArrowRight']) player.vx = player.speed;

  // Jumping
  if (keys['Space'] && player.onGround) {
    player.vy = player.jumpPower;
    player.onGround = false;
  }

  // Apply gravity
  player.vy += gravity;

  // Player movement
  player.x += player.vx;
  player.y += player.vy;

  // Ground collision
  if (player.y + player.height >= floor) {
    player.y = floor - player.height;
    player.vy = 0;
    player.onGround = true;
  }

  // Check for collision with the right wall and move the camera
  if (player.x + player.width >= canvas.width && cameraX + canvas.width < levelWidth) {
    cameraX += cameraSpeed;  // Move camera right when player hits the right edge
    player.x = 50;           // Keep player at the left side of the canvas
  }

  // Ensure the camera doesn't move past the end of the level
  if (cameraX + canvas.width >= levelWidth) {
    cameraX = levelWidth - canvas.width;
  }
}

// Draw function to render the player and camera
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ground
  ctx.fillStyle = '#444';
  ctx.fillRect(0 - cameraX, floor, levelWidth, 40);  // Adjust ground to camera position

  // Draw player
  ctx.fillStyle = '#0f0';
  ctx.fillRect(player.x - cameraX, player.y, player.width, player.height);  // Adjust player position to camera

  // Draw level elements (environment) — This is where you'll add things like platforms or obstacles later
}

// Main game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
