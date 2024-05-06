import { generateBoard } from './modules/boardCreation.js';
import { loadHTML } from './modules/initVisuals.js';
import { startGame } from './modules/initGameplay.js';

// Size of the board.
const size = 5;

const seed = "mlp";

document.querySelector(':root').style.setProperty('--board-size', size);

// Initiate a playing field.
const board = generateBoard(seed, size);

// Load most HTML and CSS.
loadHTML(board);

startGame(size);
