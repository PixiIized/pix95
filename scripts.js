// Setup canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
let dpr;
let width;
let height;
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
let draggingWindow = null;
let windowHeaderHeight = 19;
let taskbarHeight = 26;
let allWindows = [];

// Window
function window95(x, y, width, height, title, name) {
    // Local variables
    let dragOffsetX;
    let dragOffsetY;
    let isDraggingWindow;

    // Constructor variables
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.title = title;
    this.name = name;
    this.icon = new Image(16, 16);
    this.icon.src = 'apps/' + this.name + '/icon.png';

    this.drawWindow = function drawWindow() {
        // Draw window
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
        // Draw header
        ctx.fillStyle = windowHeader;
        ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, windowHeaderHeight);
        // Draw icon
        ctx.drawImage(this.icon, this.x + 4, this.y + 4, 16, 16);
        // Write title
        ctx.font = 'bold 14px w95';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = windowHighlight;
        ctx.fillText(this.title, this.x + 22, this.y + (windowHeaderHeight / 2) + 2);

        // Drag check
        this.dragCheck();
    }

    // Check dragging
    this.dragCheck = function dragCheck() {
        this.dragCheck = function dragCheck() {
            if (isMouseDown) {
                if (draggingWindow === this) {
                    this.x = mouseX - dragOffsetX;
                    this.y = mouseY - dragOffsetY;
                } else if (draggingWindow === null && isMouseTouching(this)) {
                    dragOffsetX = mouseX - this.x;
                    dragOffsetY = mouseY - this.y;
                    draggingWindow = this;
                }
            } else if (draggingWindow === this) {
                draggingWindow = null;
            }
        }

        this.bound();
    }

    // Bound window
    this.bound = function bound() {
        if (this.x < 8) {
            this.x = 8;
        }
        if (this.y < 8) {
            this.y = 8;
        }
        if (this.x > window.innerWidth - 64) {
            this.x = window.innerWidth - 64;
        }
        if (this.y > window.innerHeight - 64) {
            this.y = window.innerHeight - 64;
        }
    }

    // Add to window array
    allWindows.push(this);
}

// Draw
function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw taskbar
    ctx.fillStyle = windowColor;
    ctx.fillRect(0, height - taskbarHeight, width, height);
    ctx.fillStyle = windowHighlight;
    ctx.fillRect(0, height - taskbarHeight - 1, width, 1);
    ctx.fillStyle = windowColor;
    ctx.fillRect(0, height - taskbarHeight - 2,width, 1);

    // Draw windows
    for (const win of allWindows) {
        win.drawWindow();
    }

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

    ctx.scale(dpr, dpr);
}

// I realized "if then return true else then return false" is super redundant and uneeded, but I'll leave it in to annoy people :3
function isMouseTouching(window) {
    if (mouseX >= window.x && mouseX <= window.x + window.width && mouseY >= window.y && mouseY <= window.y + windowHeaderHeight) {
        return true;
    } else {
        return false;
    }
}

function isEdgeTouching(window95) {
    if (window95.x + window95.width >= window.innerHeight) {
        return true;
    } else {
        return false;
    }
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

canvas.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

canvas.addEventListener("mousedown", function(event) {
    isMouseDown = true; 

    for (let i = allWindows.length - 1; i >= 0; i--) {
        if (isMouseTouching(allWindows[i])) {
            // Move window to front
            allWindows.push(allWindows.splice(i, 1)[0]);
            break;
        }
    }
});

canvas.addEventListener("mouseup", function(event) {
    isMouseDown = false;
});

// Pix 95

// Demo
const myComputer = new window95(10, 10, 300, 200, 'My Computer', 'myComputer');
const executable = new window95(50, 50, 300, 200, 'Executable', 'executable');
const windowsExplorer = new window95(90, 90, 300, 200, 'Windows Explorer', 'windowsExplorer');

// Draw
draw();