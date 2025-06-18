// Imports
import { state } from './state.js';
import { config } from './config.js'
import { scaleCanvas } from './canvas.js';

// Set up listeners
export function setupListeners(canvas) { 
    canvas.addEventListener('mousemove', e => {
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;
    });

    canvas.addEventListener('mousedown', () => {
        state.isMouseDown = true;
        let topWindow = null;
        let highestZ = -Infinity;
        for (const win of state.allWindows) {
            if (win.isMouseOnHeader() && win.zIndex > highestZ) {
                topWindow = win;
                highestZ = win.zIndex;
            }
        }
        
        if (topWindow) {
            state.dragOffsetX = state.mouseX - topWindow.x;
            state.dragOffsetY = state.mouseY - topWindow.y;
            topWindow.zIndex = ++state.topZ;
            state.draggingWindow = topWindow;
        }
    });

    canvas.addEventListener('mouseup', () => {
        state.isMouseDown = false;
        state.draggingWindow = null;
    });

    canvas.addEventListener('mouseleave', () => {
        state.isMouseDown = false;
    });

    window.addEventListener('resize', () => {
        for (const win of state.allWindows) {
            win.bound();
        }

        let setup = scaleCanvas();
        state.canvasWidth = setup.width;
        state.canvasHeight = setup.height;
    });
}
