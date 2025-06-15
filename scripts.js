// Setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
scale();

//Colors
let pix95Background = '#008080';
let windowColor = '#c0c0c0';
let windowHighlight = '#ffffff';
let windowShadow = '#606060';
let windowDark = '#000000';
let windowHeader = '#010080';

// Variables
let mouseX;
let mouseY;
let isMouseDown;
let isDraggingWindow;
let dragOffsetX;
let dragOffsetY;
let windowHeaderHeight = 18;

// Objects (but not actually)
function window95(x, y, width, height, title) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.title = title;

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
        ctx.fillStyle = windowHeader;
        ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, windowHeaderHeight);
        ctx.font = 'bold 14px w95';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = windowHighlight;
        ctx.fillText(this.title, this.x + 4, this.y + (windowHeaderHeight / 2) + 2);
    }

    this.dragCheck = function dragCheck() {
        if (isMouseDown && isDraggingWindow) {
            this.x = mouseX - dragOffsetX;
            this.y = mouseY - dragOffsetY;
            isDraggingWindow = true;
        } else if (isMouseDown && isMouseTouching(this)) {
            dragOffsetX = mouseX - this.x;
            dragOffsetY = mouseY - this.y;
            isDraggingWindow = true;
        } else {
            isDraggingWindow = false;
        }
    }

    document.addEventListener("mousedown", function(event) {
        
    });
}

// Taskbar dimensions
let taskbarHeight = 26;

// Setup
const testWindow = new window95(10, 10, 300, 200, 'My Computer');

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

    // Draw temp window
    testWindow.drawWindow();
    testWindow.dragCheck();

    requestAnimationFrame(draw);
}

// Functions
function scale() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function isMouseTouching(window) {
    if (mouseX >= window.x && mouseX <= window.x + window.width && mouseY >= window.y && mouseY <= window.y + windowHeaderHeight) {
        return true;
    } else {
        return false;
    }
}

// Listeners
window.onresize = scale;

canvas.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

canvas.addEventListener("mousedown", function(event) {
    isMouseDown = true; 
});

canvas.addEventListener("mouseup", function(event) {
    isMouseDown = false;
});