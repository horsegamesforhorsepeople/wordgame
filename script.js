import { generateBoard } from './modules/boardCreation.js';
import { loadHTML } from './modules/initVisuals.js';
import { startGame } from './modules/initGameplay.js';
import { fetchValidWords } from './modules/importWords.js';
import { solveBoard } from './modules/solver.js';
import { showWords } from './modules/showWords.js';
import { copyStats } from './modules/copyStats.js';

const start = Date.now();
// Size of the board.
//const size = 4;

//const seed = "marefriend";

const parsedURL = new URL(window.location.href);
let seed = Number(parsedURL.searchParams.get("seed"));
let size = Number(parsedURL.searchParams.get("size"));
let daily = parsedURL.searchParams.get("daily") === "true";
console.log(daily, seed, size);

if (seed === null || seed === 0)
    seed = Math.floor(Math.random() * Math.pow(10, 8));

if (size === null)
    size = 4;

if (size < 2)
    size = 4;

const date = new Date();
if (daily)
    seed = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1).toString().padStart(2, '0') + "-" + date.getUTCDate().toString().padStart(2, '0');

setSeed(seed);
console.log(size, seed);

// Apply size of board to CSS.
document.querySelector(':root').style.setProperty('--board-size', size);


// Initiate a playing field.
let board = generateBoard(seed, size);
//const board = "zztzrhnaecifzzez";

// Load most HTML and CSS.
loadHTML(board);

// Show loading screen.
hideBoard();

// All words, words on the board.
let words, wordsOnBoard;

fetchValidWords()
    .then(validWords => {
        words = validWords;
        wordsOnBoard = solveBoard(board, words);

        showBoard();
        startGame(size, words);

        const end = Date.now();
        console.log("ready after", end - start, "ms");

    })
    .catch(error => {
        console.error(error);
    });


document.getElementById("play-button").onclick = () => {
    daily = false;
    setSeed();
    seed = document.getElementById("enter-seed-input").value || Math.floor(Math.random() * Math.pow(10, 8));
    //seed = "a";
    size = Number(document.getElementById("enter-size-input").value) || 4;
    if (size < 2)
        size = 2;
    play(seed, size);
}

document.getElementById("daily-button").onclick = () => {
    seed = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1).toString().padStart(2, '0') + "-" + date.getUTCDate().toString().padStart(2, '0');
    size = 4;
    play(seed, size);
}

function play(seed, size) {
    console.log(seed);
    setSeed(seed);
    document.getElementById("play-button").style.display = "none";
    document.getElementById("seed-container").style.display = "none";
    document.getElementById("show-words").style.display = "none";
    document.getElementById("daily-button").style.display = "none";
    document.getElementById("copy-button").style.display = "none";
    board = generateBoard(seed, size);
    loadHTML(board);
    hideBoard();
    wordsOnBoard = solveBoard(board, words);
    document.querySelector(':root').style.setProperty('--board-size', size);
    showBoard();
    startGame(size, words);
}

document.getElementById("copy-button").onclick = () => {
    copyStats(board, seed, daily, size);
}

document.getElementById("show-words").onclick = () => {
    showWords(wordsOnBoard);
}

function hideBoard() {
    document.getElementById("game-container").style.display = "none";
    const hidden = document.createElement("p");
    hidden.id = "hidden";
    hidden.innerText = "Loading...";
    document.body.append(hidden);
}

function showBoard() {
    document.getElementById("game-container").style.display = "grid";
    document.getElementById("hidden").remove();
}

// Sets the "seed" to make Math.random() return the same value every time.
function setSeed(seed) {
    !function(f,a,c){var s,l=256,p="random",d=c.pow(l,6),g=c.pow(2,52),y=2*g,h=l-1;function n(n,t,r){function e(){for(var n=u.g(6),t=d,r=0;n<g;)n=(n+r)*l,t*=l,r=u.g(1);for(;y<=n;)n/=2,t/=2,r>>>=1;return(n+r)/t}var o=[],i=j(function n(t,r){var e,o=[],i=typeof t;if(r&&"object"==i)for(e in t)try{o.push(n(t[e],r-1))}catch(n){}return o.length?o:"string"==i?t:t+"\0"}((t=1==t?{entropy:!0}:t||{}).entropy?[n,S(a)]:null==n?function(){try{var n;return s&&(n=s.randomBytes)?n=n(l):(n=new Uint8Array(l),(f.crypto||f.msCrypto).getRandomValues(n)),S(n)}catch(n){var t=f.navigator,r=t&&t.plugins;return[+new Date,f,r,f.screen,S(a)]}}():n,3),o),u=new m(o);return e.int32=function(){return 0|u.g(4)},e.quick=function(){return u.g(4)/4294967296},e.double=e,j(S(u.S),a),(t.pass||r||function(n,t,r,e){return e&&(e.S&&v(e,u),n.state=function(){return v(u,{})}),r?(c[p]=n,t):n})(e,i,"global"in t?t.global:this==c,t.state)}function m(n){var t,r=n.length,u=this,e=0,o=u.i=u.j=0,i=u.S=[];for(r||(n=[r++]);e<l;)i[e]=e++;for(e=0;e<l;e++)i[e]=i[o=h&o+n[e%r]+(t=i[e])],i[o]=t;(u.g=function(n){for(var t,r=0,e=u.i,o=u.j,i=u.S;n--;)t=i[e=h&e+1],r=r*l+i[h&(i[e]=i[o=h&o+t])+(i[o]=t)];return u.i=e,u.j=o,r})(l)}function v(n,t){return t.i=n.i,t.j=n.j,t.S=n.S.slice(),t}function j(n,t){for(var r,e=n+"",o=0;o<e.length;)t[h&o]=h&(r^=19*t[h&o])+e.charCodeAt(o++);return S(t)}function S(n){return String.fromCharCode.apply(0,n)}if(j(c.random(),a),"object"==typeof module&&module.exports){module.exports=n;try{s=require("crypto")}catch(n){}}else"function"==typeof define&&define.amd?define(function(){return n}):c["seed"+p]=n}("undefined"!=typeof self?self:this,[],Math);
    Math.seedrandom(seed);
}
