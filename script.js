import { generateBoard } from './modules/boardCreation.js';
import { loadHTML } from './modules/initVisuals.js';
import { startGame } from './modules/initGameplay.js';
import { fetchValidWords } from './modules/importWords.js';
import { solveBoard } from './modules/solver.js';

// Size of the board.
const size = 4;

const seed = "mareseed";

// Apply size of board to CSS.
document.querySelector(':root').style.setProperty('--board-size', size);


// Initiate a playing field.
const board = generateBoard(seed, size);

// Load most HTML and CSS.
loadHTML(board);

const start = Date.now();
fetchValidWords()
    .then(validWords => {
        solveBoard(board, validWords);

        startGame(size, validWords);

        const end = Date.now();

        console.log(end - start);
    })
    .catch(error => {
        console.error(error);
    });


