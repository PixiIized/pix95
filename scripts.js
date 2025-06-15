// Config
const config = {
    windowHeaderHeight: 19,
    taskbarHeight: 26,
    colors: {
        pix95Background: '#008080',
        windowColor: '#c0c0c0',
        windowHighlight: '#ffffff',
        windowShadow: '#606060',
        windowDark: '#000000',
        windowHeader: '#010080'
    }
};

// Setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
let dpr;
let width;
let height;
scale();



// Variables
let mouseX, mouseY, isMouseDown, draggingWindow = null, topZ = 1, allWindows = [], sortedWindows = allWindows;
let dragOffsetX = 0, dragOffsetY = 0;

// Window
class window95 {
    constructor(x, y, width, height, title, name) {
        // Constructor variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.title = title;
        this.name = name;
        this.icon = new Image(16, 16);
        this.icon.src = 'apps/' + this.name + '/icon.png';
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        this.zIndex = ++topZ;

        // Add to window array
        allWindows.push(this);
    }

    drawWindow() {
        // Draw window
        ctx.fillStyle = config.colors.windowDark;
        ctx.fillRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
        ctx.fillStyle = config.colors.windowColor;
        ctx.fillRect(this.x - 2, this.y - 2, this.width + 3, this.height + 3);
        ctx.fillStyle = config.colors.windowShadow;
        ctx.fillRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
        ctx.fillStyle = config.colors.windowHighlight;
        ctx.fillRect(this.x - 1, this.y - 1, this.width + 1, this.height + 1);
        ctx.fillStyle = config.colors.windowColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // Draw header
        ctx.fillStyle = config.colors.windowHeader;
        ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, config.windowHeaderHeight);
        // Draw icon
        ctx.drawImage(this.icon, this.x + 4, this.y + 4, 16, 16);
        // Write title
        ctx.font = 'bold 14px w95';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = config.colors.windowHighlight;
        ctx.fillText(this.title, this.x + 22, this.y + (config.windowHeaderHeight / 2) + 2);

        // Drag check
        this.dragCheck();
        this.bound();
    }

    // Check dragging
    dragCheck() {
        if (isMouseDown && draggingWindow === this) {
            this.x = mouseX - dragOffsetX;
            this.y = mouseY - dragOffsetY;
        }
    }

    // Bound window
    bound() {
        this.x = Math.min(Math.max(this.x, 0 - this.width + 64), window.innerWidth - 64);
        this.y = Math.min(Math.max(this.y, 0), window.innerHeight - 25 - config.taskbarHeight);
    }
}

// Draw
function draw() {
    // Clear screen
    ctx.clearRect(0, 0, width, height);

    // Sort windows
    sortedWindows = [...allWindows].sort((a, b) => a.zIndex - b.zIndex);

    // Draw windows
    for (const win of sortedWindows) {
        win.drawWindow();
    }

    // Draw taskbar
    drawTaskbar();

    // Next frame
    requestAnimationFrame(draw);
}

// Functions
function scale() {
    dpr = window.devicePixelRatio * 4 || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(1, 0, 0, 1, 0, 0); 
    ctx.scale(dpr, dpr);
}

function isMouseOnHeader({ x, y, width }) {
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + config.windowHeaderHeight;
}

function drawTaskbar() {
    ctx.fillStyle = config.colors.windowColor;
    ctx.fillRect(0, height - config.taskbarHeight, width, height);
    ctx.fillStyle = config.colors.windowHighlight;
    ctx.fillRect(0, height - config.taskbarHeight - 1, width, 1);
    ctx.fillStyle = config.colors.windowColor;
    ctx.fillRect(0, height - config.taskbarHeight - 2,width, 1);
}

// Listeners
window.onresize = () => {
    // Bound windows
    for (const win of allWindows) {
        win.bound();
    }

    // Rescale canvas
    scale();
};

canvas.onmouseleave = () => {
    isMouseDown = false;
}

canvas.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

canvas.addEventListener("mousedown", function(event) {
    isMouseDown = true; 

    // Handle Z
    let topWindow = null;
    let highestZ = -Infinity;

    for (const win of allWindows) {
        if (isMouseOnHeader(win) && win.zIndex > highestZ) {
            topWindow = win;
            highestZ = win.zIndex;
        }
    }

    // Dragging
    if (topWindow) {
        dragOffsetX = mouseX - topWindow.x;
        dragOffsetY = mouseY - topWindow.y;
        topWindow.zIndex = ++topZ;
        draggingWindow = topWindow;
    }
});

canvas.addEventListener("mouseup", function(event) {
    isMouseDown = false;
    draggingWindow = null;
});

// Pix 95

// Demo
const myComputer = new window95(10, 10, 300, 200, 'My Computer', 'myComputer');
const executable = new window95(50, 50, 300, 200, 'Executable', 'executable');
const windowsExplorer = new window95(90, 90, 300, 200, 'Windows Explorer', 'windowsExplorer');

// Draw
requestAnimationFrame(draw);