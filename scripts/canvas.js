// Imports
import { config } from './config.js';

// Canvas
import { canvas, ctx } from '../main.js';

export function scaleCanvas() {
    // Scale the stuff
    const dpr = window.devicePixelRatio * config.scaleQuality || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Dimensions
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Scale the stuff (for real this time)
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    return { width, height };
}
