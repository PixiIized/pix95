// Imports
import { state } from './state.js';
import { config } from './config.js';

// Window class
export class Window95 {
    constructor(x, y, width, height, title, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.title = title;
        this.name = name;
        this.icon = new Image(16, 16);
        this.icon.src = `./apps/${this.name}/icon.png`;
        this.zIndex = ++state.topZ;

        // Add to windows list
        state.allWindows.push(this);
    }
    
    drawWindow(ctx) {
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

        // Draw window header
        ctx.fillStyle = config.colors.windowHeader;
        ctx.fillRect(this.x + 2, this.y + 2, this.width - 4, config.windowHeaderHeight);

        // Draw window icon
        ctx.drawImage(this.icon, this.x + 4, this.y + 4, 16, 16);

        // Write window title
        ctx.font = 'bold 12px w95';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = config.colors.windowHighlight;
        ctx.fillText(this.title, this.x + 22, this.y + (config.windowHeaderHeight / 2) + 2);

        // Drag and keep in bounds
        this.dragCheck();
        this.bound();
    }

    dragCheck() {
        if (state.isMouseDown && state.draggingWindow === this) {
            this.x = state.mouseX - state.dragOffsetX;
            this.y = state.mouseY - state.dragOffsetY;
        }
    }

    bound() {
        this.x = Math.min(Math.max(this.x, 0 - this.width + 64), window.innerWidth - 64);
        this.y = Math.min(Math.max(this.y, 0), window.innerHeight - 25 - config.taskbarHeight);
    }

    isMouseOnHeader() {
        return (
            state.mouseX >= this.x &&
            state.mouseX <= this.x + this.width &&
            state.mouseY >= this.y &&
            state.mouseY <= this.y + config.windowHeaderHeight
        );
    }
}
