const foundWords = [];

const solveBoard = (board, words) => {
    const wordMap = parseWords(words);
    const boardIndexes = createIndexMap(board);
    const neighborMap = createNeighborMap(board);

    for (let i = 0; i < board.length; i++) {
        DFS(i, [], neighborMap.get(i), boardIndexes, wordMap, neighborMap);
    }
    console.log(foundWords);
}

function DFS(index, path, neighbors, boardIndexes, words, neighborMap) {
    if (path.length === 0)
        path.push(index)

    for (let i = 0; i < neighbors.length; i++) {
        if (path.includes(neighbors[i]))
            continue;

        const index = neighbors[i];
        const pathNew = [...path];
        pathNew.push(index);

        if (path.length < 3) {
            DFS(index, pathNew, neighborMap.get(index), boardIndexes, words, neighborMap);
        } else {
            const word = pathToWord(path, boardIndexes);
            const stub = word.substring(0, 3);
            if (words.has(stub)) {
                if (words.get(stub).includes(word) && !foundWords.includes(word))
                    foundWords.push(word);
                DFS(index, pathNew, neighborMap.get(index), boardIndexes, words, neighborMap);
            }
        }
    }
}

function pathToWord(path, boardIndexes) {
    let word = "";

    for (let i = 0; i < path.length; i++) {
        word += boardIndexes.get(path[i]);
    }

    return word;
}

function parseWords(words) {
    const map = new Map();

    for (const word of words) {
        const section = word.substring(0, 3);
        if (!map.has(section))
            map.set(section, []);
        const a = map.get(section);
        a.push(word);
        map.set(section, a);
    }

    return map;
}

function createIndexMap(board) {
    const map = new Map();

    for (let i = 0; i < board.length; i++)
        map.set(i, board[i]);

    return map;
}

function createNeighborMap(board) {
    const map = new Map();
    const length = board.length;
    const size = Math.sqrt(length);

    for (let i = 0; i < length; i++) {
        const neighbors = [];

        // north
        if (i >= size)
            neighbors.push(i - size);

        // northeast
        if (i >= size && (i + 1) % size !== 0)
            neighbors.push(i - size + 1);

        // east
        if ((i + 1) % size !== 0)
            neighbors.push(i + 1);

        // southeast
        if ((i + 1) % size !== 0 && i < (length - size))
            neighbors.push(i + size + 1);

        // south
        if (i < (length - size))
            neighbors.push(i + size);

        // southwest
        if (i < (length - size) && i % size !== 0)
            neighbors.push(i + size - 1)

        // west
        if (i % size !== 0)
            neighbors.push(i - 1);

        // northwest
        if (i % size !== 0 && i >= size)
            neighbors.push(i - size - 1);

        map.set(i, neighbors);
    }

    return map;
}

export { solveBoard };
