// Imports
import { state } from './state.js';
import { config } from './config.js';

// ctx
import { ctx } from '../main.js';

// Draw loop
export function draw() {
    ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);

    state.sortedWindows = [...state.allWindows].sort((a, b) => a.zIndex - b.zIndex);

    for (const win of state.sortedWindows) {
        win.drawWindow(ctx);
    }

    drawTaskbar(ctx, state.canvasWidth, state.canvasHeight);

    requestAnimationFrame(() => draw());
}

function drawTaskbar(ctx, width, height) {
    ctx.fillStyle = config.colors.windowColor;
    ctx.fillRect(0, height - config.taskbarHeight, width, height);
    ctx.fillStyle = config.colors.windowHighlight;
    ctx.fillRect(0, height - config.taskbarHeight - 1, width, 1);
    ctx.fillStyle = config.colors.windowColor;
    ctx.fillRect(0, height - config.taskbarHeight - 2, width, 1);
}
