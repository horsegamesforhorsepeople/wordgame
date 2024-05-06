const loadHTML = (board) => {
    const gameContainer = createGameContainer();

    createGrid(gameContainer, board);

    createScoreBoard();

}

// Creates the outer container for the game board.
function createGameContainer() {
    const container = document.createElement("div");
    container.id = "game-container";
    document.body.append(container);

    return container;
}

// Creates the grid of tiles.
function createGrid(container, boardString) {
    for (let i = 0; i < boardString.length; i++)
        createTile(container, boardString[i], i);
}

// Creates a single tile.
function createTile(container, letter, index) {
    const tileContainer = document.createElement("div");
    tileContainer.className = "tile-container";
    tileContainer.dataset.letter = letter;
    tileContainer.dataset.position = index;

    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.letter = letter;
    tile.dataset.position = index;
    tile.innerText = letter.toUpperCase();
    container.append(tileContainer);
    tileContainer.append(tile);

    return tileContainer;
}

// Creates the scoreboard at the top of the screen.
function createScoreBoard() {
    const scoreContainer = document.createElement("div");
    scoreContainer.id = "score-container";
    document.body.append(scoreContainer);

    // Create and append the "WORDS" text to the score container.
    const wordsText = document.createElement("p");
    wordsText.id = "word-text";
    wordsText.innerText = "WORDS:\t";

    const wordsAmount = document.createElement("span");
    wordsAmount.id = "words-amount";

    scoreContainer.append(wordsText);
    wordsText.append(wordsAmount);

    // Create and append the "SCORE" text to the score container.
    const scoreText = document.createElement("p");
    scoreText.id = "score-text";
    scoreText.innerText = "SCORE:\t";

    const scoreAmount = document.createElement("span");
    scoreAmount.id = "score-amount";

    scoreContainer.append(scoreText);
    scoreText.append(scoreAmount);

    // Create and append the timer to the score container.
    const time = document.createElement("p");
    time.id = "timer";
    time.innerText = "80";

    scoreContainer.append(time);
}

export { loadHTML };
