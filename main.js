// Imports
import { config } from './scripts/config.js';
import { scaleCanvas } from './scripts/canvas.js';
import { state } from './scripts/state.js';
import { Window95 } from './scripts/windows.js';
import { draw } from './scripts/draw.js';
import { setupListeners } from './scripts/listeners.js';

// Set up canvas
export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
let setup = scaleCanvas();
state.canvasWidth = setup.width;
state.canvasHeight = setup.height;

// Set up listeners
setupListeners(canvas);

// Define demo windows
new Window95(10, 10, 300, 200, 'My Computer', 'myComputer');
new Window95(50, 50, 300, 200, 'Executable', 'executable');
new Window95(90, 90, 300, 200, 'Windows Explorer', 'windowsExplorer');

// Start draw loop
draw();

// Note to self: avoid commenting self explanatory functions. It's becoming a problem.