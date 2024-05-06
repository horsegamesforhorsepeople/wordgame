const startGame = (size) => {

    fetchValidWords();
    fetchSize(size);

    document.querySelectorAll(".tile-container").forEach((tile) => {
        tile.addEventListener("mousedown", handleMouseDown); 
    });
    document.body.addEventListener("mouseup", handleMouseUp); 

}

let currentWord = "";
let validWords, previousTile, size;
let alreadyVisited = [];
let foundWords = [];

function fetchSize(a) {
    size = a;
}

function fetchValidWords() {
    fetch('words.txt')
        .then(response => response.text())
        .then(data => {
            validWords = data.split(/\r?\n/)
            validWords = new Set(validWords);
        })
        .catch(error => {
            console.error(error);
        });
}

// Starts the timer.
function startTimer() {
    let timeLeft = 80;
    const timer = setInterval(() => {
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft === 0)
            clearInterval(timer);
        timeLeft--;
    }, 1000);
}

function handleMouseDown(event) {
    previousTile = event.target;
    currentWord += event.target.dataset.letter;
    if (event.target.classList.contains("tile-container")) {
        alreadyVisited.push(event.target.children[0]);
        setTileToHeld(event.target);
        setTileColor(event.target);
    } else {
        alreadyVisited.push(event.target);
        setTileToHeld(event.target.parentNode);
        setTileColor(event.target.parentNode);
    }
    document.querySelectorAll(".tile").forEach((tile) => {
        tile.addEventListener("mouseenter", handleMouseEnter); 
    });
}

function handleMouseUp() {
    if (checkWord()) {
        updateScore();
        updateWordCount();
    }

    currentWord = "";
    alreadyVisited = [];

    document.querySelectorAll(".tile").forEach((tile) => {
        tile.removeEventListener("mouseenter", handleMouseEnter); 
        tile.parentNode.className = "tile-container";
        tile.parentNode.style.filter = "brightness(1)";
        tile.parentNode.style.backgroundColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-bright');
        if (tile.parentNode.children.length !== 1)
            tile.parentNode.children[1].remove();
    });
}

function handleMouseEnter(event) {

    if (!tileIsClose(event.target.dataset.position, previousTile.dataset.position)) 
        return;

    if (alreadyVisited.includes(event.target))
        return;

    if (event.target === previousTile)
        return;


    currentWord += event.target.dataset.letter;
    alreadyVisited.push(event.target);
    setTileToHeld(event.target.parentNode);
    if (event.target.classList.contains("tile-container"))
        drawLine(previousTile, event.target);
    else
        drawLine(previousTile, event.target.parentNode);
    for (let i = 0; i < alreadyVisited.length; i++)
        setTileColor(alreadyVisited[i].parentNode);
    previousTile = event.target;
}

function drawLine(a, b) {
    if (a.classList.contains("tile"))
        a = a.parentNode;
    const line = document.createElement("div");
    line.className = "line";
    b.append(line);

    b.style.zIndex = Number(a.style.zIndex) + 1;

    let transformVal = `scale(100%)`;

    const direction = getDistance(a.dataset.position, b.dataset.position);

    if (compareArray(direction, [-1, 0])) {
        line.style.width = line.clientHeight + line.clientWidth + "px";
        line.style.left = -line.clientWidth / 2 - 4 + "px";
    } else if (compareArray(direction, [-1, -1])) {
        transformVal += " rotate(45deg)";
        line.style.width = Math.SQRT2 * line.clientWidth + line.clientHeight + "px";
        line.style.left = -line.clientWidth / 2 - 3 + "px";
        line.style.top = -line.clientHeight + 3 + "px";
    } else if (compareArray(direction, [0, -1])) {
        line.style.width = line.clientHeight + line.clientWidth + "px";
        transformVal += " rotate(90deg)";
        line.style.top = -line.clientHeight / 2 - 5 + "px";
    } else if (compareArray(direction, [1, -1])) {
        transformVal += " rotate(315deg)";
        line.style.width = Math.SQRT2 * line.clientWidth + line.clientHeight + "px";
        line.style.left = line.clientHeight + 2 + "px";
        line.style.top = -line.clientHeight + 3 + "px";
    } else if (compareArray(direction, [1, 0])) {
        line.style.width = line.clientHeight + line.clientWidth + "px";
        line.style.right = -line.clientWidth / 2 - 4 + "px";
    } else if (compareArray(direction, [1, 1])) {
        transformVal += " rotate(45deg)";
        line.style.width = Math.SQRT2 * line.clientWidth + line.clientHeight + "px";
        line.style.right = -line.clientWidth / 2 - 5 + "px";
        line.style.bottom = -line.clientHeight + 3 + "px";
    } else if (compareArray(direction, [0, 1])) {
        line.style.width = line.clientHeight + line.clientWidth + "px";
        transformVal += " rotate(90deg)";
        line.style.bottom = -line.clientHeight / 2 - 5 + "px";
    } else if (compareArray(direction, [-1, 1])) {
        transformVal += " rotate(315deg)";
        line.style.width = Math.SQRT2 * line.clientWidth + line.clientHeight + "px";
        line.style.right = line.clientHeight + 1 + "px";
        line.style.bottom = -line.clientHeight + 3 + "px";
    }

    line.style.transform = transformVal;

//    if (compareArray(direction, [-1, 0])) {
//        line.style.width = line.clientHeight + line.clientWidth + "px";
//        line.style.transform = `translate(calc(-50% + ${line.clientHeight / 2}px))`;
//    } else if (compareArray(direction, [-1, -1])) {
//        line.style.width = `calc(${Math.SQRT2} * ${line.clientWidth}px + ${line.clientHeight/2}px)`;
//        line.style.transform = `rotate(45deg) translate(calc(-50% + 2 * ${Math.sqrt(line.clientHeight)}px), ${Math.sqrt(line.clientHeight)}px)`;
//    } else if (compareArray(direction, [0, -1])) {
//        line.style.transform = `translate(calc(-50% - ${line.clientHeight}px / 2), calc(100% - ${line.clientHeight}px)) rotate(90deg)`;
//        line.style.width = `calc(${line.clientHeight}px * (1 - 1/8) + ${line.clientWidth}px)`;
//    } else if (compareArray(direction, [1, -1])) {
//        line.style.transform = `translate(25%, calc(-600% - ${line.clientHeight}px)) rotate(315deg)`;
//        line.style.width = `calc(${Math.SQRT2} * ${line.clientWidth}px + ${line.clientHeight}px`;
//    }


}

function compareArray(a1, a2) {
    return JSON.stringify(a1) === JSON.stringify(a2);
}

function setTileToHeld(tile) {
    tile.classList.add("held");
}

function setTileColor(tile) {
    if (tile.children.length !== 1) {
        tile.children[1].style.filter = "brightness(1)";
        tile.children[1].style.backgroundColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-bright');
    }
    tile.style.filter = "brightness(1)";
    tile.style.backgroundColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-bright');
    if (!validWords.has(currentWord) || currentWord.length < 3) {
        tile.style.filter = "brightness(0.75)";
        if (tile.children.length !== 1)
            tile.children[1].style.backgroundColor = "#ea3c3c";
    } else if (foundWords.includes(currentWord)) {
        tile.style.backgroundColor = "rgba(252, 255, 79, 0.7)";
        if (tile.children.length !== 1)
            tile.children[1].style.backgroundColor = "white";
    } else {
        tile.style.backgroundColor = "rgba(12, 179, 88, 1)";
        if (tile.children.length !== 1)
            tile.children[1].style.backgroundColor = "white";
    }
}

function tileIsClose(a, b) {

    let [deltaX, deltaY] = getDistance(a, b);

    return Math.hypot(Math.abs(deltaX), Math.abs(deltaY)) <= Math.SQRT2;
}

function getDistance(a, b) {
    let grid = [];

    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = size * i; j < (i + 1) * size; j++)
            row.push(j);
        grid.push(row);
    }

    let bC;
    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
            if (grid[i][j] == b)
                bC = [j, i];

    let aC;
    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
            if (grid[i][j] == a)
                aC = [j, i];

    let deltaX = aC[0] - bC[0];
    let deltaY = aC[1] - bC[1];
    
    return [deltaX, deltaY];
}

function checkWord() {
    return validWords.has(currentWord) && currentWord.length > 2 && !foundWords.includes(currentWord);
}

function updateScore() {
    const score = document.getElementById("score-amount");
    score.innerText = (Number(score.innerText) || 0) + getScore();
    foundWords.push(currentWord);
}

function getScore() {
    const scoreTable = {
        3: 100,
        4: 400,
        5: 800,
        6: 1400,
        7: 1800,
        8: 2200,
        9: 400 * currentWord.length - 1000
    }

    let scoreIndex = currentWord.length < 10 ? currentWord.length : 9;

    return scoreTable[scoreIndex];
}

function updateWordCount() {
    const wordCount = document.getElementById("words-amount");
    wordCount.innerText = foundWords.length;
}


export { startGame };
