const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const keys = {};
document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

const player = {
  x: 50,
  y: 0,
  width: 32,
  height: 32,
  vx: 0,
  vy: 0,
  speed: 3,
  jumpPower: -10,
  onGround: false
};

const gravity = 0.5;
const floor = canvas.height - 40;

function update() {
  // Horizontal movement
  player.vx = 0;
  if (keys['ArrowLeft']) player.vx = -player.speed;
  if (keys['ArrowRight']) player.vx = player.speed;

  // Jump
  if (keys['Space'] && player.onGround) {
    player.vy = player.jumpPower;
    player.onGround = false;
  }

  // Gravity
  player.vy += gravity;

  // Position update
  player.x += player.vx;
  player.y += player.vy;

  // Ground collision
  if (player.y + player.height >= floor) {
    player.y = floor - player.height;
    player.vy = 0;
    player.onGround = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ground
  ctx.fillStyle = '#444';
  ctx.fillRect(0, floor, canvas.width, 40);

  // Player
  ctx.fillStyle = '#0f0';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
