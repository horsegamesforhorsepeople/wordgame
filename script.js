import { generateBoard } from './modules/boardCreation.js';
import { loadHTML } from './modules/initVisuals.js';
import { startGame } from './modules/initGameplay.js';
import { fetchValidWords } from './modules/importWords.js';
import { solveBoard } from './modules/solver.js';

const start = Date.now();
// Size of the board.
const size = 4;

const seed = "marefriend";

// Apply size of board to CSS.
document.querySelector(':root').style.setProperty('--board-size', size);


// Initiate a playing field.
const board = generateBoard(seed, size);
//const board = "zztzrhnaecifzzez";

// Load most HTML and CSS.
loadHTML(board);

fetchValidWords()
    .then(validWords => {
        const wordsOnBoard = solveBoard(board, validWords);

        startGame(size, validWords);

        const end = Date.now();
        console.log("ready after", end - start, "ms");

    })
    .catch(error => {
        console.error(error);
    });


