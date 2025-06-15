// Setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
scale();

//Colors
let pix95Background = '#008080';
let windowColor = '#c0c0c0';
let windowHighlight = '#ffffff';
let windowShadow = '#606060';
let windowDark = '#000000';

// Variables
let mouseX;
let mouseY;

// Objects (but not actually)
function window95(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.drawWindow = function drawWindow() {
        ctx.fillStyle = windowDark;
        ctx.fillRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
        ctx.fillStyle = windowColor;
        ctx.fillRect(this.x - 2, this.y - 2, this.width + 3, this.height + 3);
        ctx.fillStyle = windowShadow;
        ctx.fillRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
        ctx.fillStyle = windowHighlight;
        ctx.fillRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1);
        ctx.fillStyle = windowColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Taskbar dimensions
let taskbarHeight = 26;

// Setup
const testWindow = new window95(10, 10, 60, 40);

// Draw
draw();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw taskbar
    ctx.fillStyle = windowColor;
    ctx.fillRect(0, canvas.height - taskbarHeight, canvas.width, canvas.height);
    ctx.fillStyle = windowHighlight;
    ctx.fillRect(0, canvas.height - taskbarHeight - 1, canvas.width, 1);
    ctx.fillStyle = windowColor;
    ctx.fillRect(0, canvas.height - taskbarHeight - 2, canvas.width, 1);

    testWindow.x = mouseX;
    testWindow.y = mouseY;

    testWindow.drawWindow();

    requestAnimationFrame(draw);
}

// Functions
function scale() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Listeners
window.onresize = scale;

document.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});