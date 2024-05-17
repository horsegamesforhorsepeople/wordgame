const loadHTML = (board) => {

    let gameContainer = document.getElementById("game-container");
    if (!gameContainer)
        gameContainer = createGameContainer();
    else
        gameContainer.innerHTML = "";

    createGrid(gameContainer, board);
    
    if (!document.getElementById("score-container"))
        createScoreBoard();
    else {
        document.getElementById("score-amount").innerText = 0;
        document.getElementById("words-amount").innerText = 0;
    }

    if (!document.getElementById("seed-container"))
        createEnterSeed();

    if (!document.getElementById("show-words"))
        createShowWordsButton();

    if (!document.getElementById("daily-button"))
        createDailyButton();

    if (!document.getElementById("copy-button"))
        createCopyButton();
}

function createCopyButton() {
    const button = document.createElement("button");
    button.id = "copy-button";
    button.innerText = "Share";
    document.body.append(button);
}

function createDailyButton() {
    const button = document.createElement("button");
    button.id = "daily-button";
    button.innerText = "Daily";
    document.body.append(button);
}

// Creates the "show words" button.
function createShowWordsButton() {
    const button = document.createElement("button");
    button.id = "show-words";
    button.innerText = "Show words";
    document.body.append(button);
}

// Creates the section dedicated to the "enter seed" fields.
function createEnterSeed() {
    // Container
    const seedContainer = document.createElement("div");
    seedContainer.id = "seed-container";

    // Seed
    const enterSeedText = document.createElement("label");
    enterSeedText.innerText = "Seed: ";
    enterSeedText.htmlFor = "enter-seed-input";
    enterSeedText.id = "enter-seed-text";

    const enterSeedInput = document.createElement("input");
    enterSeedInput.id = "enter-seed-input";
    enterSeedInput.type = "text";
    enterSeedInput.placeholder = "mares";

    seedContainer.append(enterSeedText);
    seedContainer.append(enterSeedInput);

    // Size
    const enterSizeText = document.createElement("label");
    enterSizeText.innerText = "Size (>2): ";
    enterSizeText.htmlFor = "enter-size-input";
    enterSizeText.id = "enter-size-text";

    const enterSizeInput = document.createElement("input");
    enterSizeInput.id = "enter-size-input";
    enterSizeInput.type = "text";
    enterSizeInput.placeholder = "4";
    enterSizeInput.min = "2";
    enterSizeInput.value = "4";

    seedContainer.append(enterSizeText);
    seedContainer.append(enterSizeInput);

    // Play button
    const playButton = document.createElement("button");
    playButton.id = "play-button";
    playButton.innerText = "Play!";

    document.body.append(playButton);

    document.body.append(seedContainer);
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
