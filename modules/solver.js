const foundWords = [];

// To solve the board we look at an index and create a three letter long word with DFS.
// Then we reference that to the tree hashmap (see below). If the word exists we continue
// with the DFS one letter at a time and reference it to the same tree. In the end we should
// find all words.
const solveBoard = (board, words) => {
    const wordMap = parseWords(words);
    const boardIndexes = createIndexMap(board);
    const neighborMap = createNeighborMap(board);

    const start = Date.now();
    for (let i = 0; i < board.length; i++) {
        DFS(i, [], neighborMap.get(i), boardIndexes, wordMap, neighborMap, words);
    }
    const end = Date.now();
    console.log("found words in", end - start, "ms");
    console.log(foundWords);

    return foundWords;
}

// Depth First Search
function DFS(index, path, neighbors, boardIndexes, words, neighborMap, allWords) {
    if (path.length === 0)
        path.push(index)

    for (let i = 0; i < neighbors.length; i++) {
        if (path.includes(neighbors[i]))
            continue;

        const index = neighbors[i];
        const pathNew = [...path];
        pathNew.push(index);

        if (pathNew.length < 3) {
            DFS(index, pathNew, neighborMap.get(index), boardIndexes, words, neighborMap, allWords);
        } else {
            const word = pathToWord(pathNew, boardIndexes);
            const stub = word.substring(0, 3);

            // If the first three letters don't exist in the tree then we stop.
            if (!words.has(stub)) {
                continue
            }

            // If the current path doesn't exist in the tree then we stop.
            if (!canContinue(word, stub, words)) {
                continue;
            }

            // Add to the found words list.
            if (allWords.has(word) && !foundWords.includes(word)) {
                foundWords.push(word);
            }

            // Do the DFS from the current index.
            DFS(index, pathNew, neighborMap.get(index), boardIndexes, words, neighborMap, allWords);
        }
    }
}

// Checks if the current word exists in the tree hashmap.
// If it does then we can continue. If else then we stop looking into this path.
function canContinue(word, stub, wordMap) {
    let currentDirectory = wordMap.get(stub);
    for (let i = 3; i < word.length; i++) {
        if (!currentDirectory.has(word[i]))
            return false;
        currentDirectory = currentDirectory.get(word[i]);
    }

    return true;
}

// Converts a path of indexes, i.e. [0, 1, 2] -> "abc".
function pathToWord(path, boardIndexes) {
    let word = "";

    for (let i = 0; i < path.length; i++) {
        word += boardIndexes.get(path[i]);
    }

    return word;
}


// Turns the set of words into a tree structure of hashmaps.
// Structure:
/*
[
    "aaa": [
        "b": [
            "c": [...]
        ],
        "d": [
            "e": [...],
            "f": [...]
        ]
    ]
]
*/
function parseWords(words) {
    const map = new Map();

    const start = Date.now();

    for (const word of words) {
        const section = word.substring(0, 3);
        if (!map.has(section)) {
            map.set(section, new Map());
        }
        let currentDirectory = map.get(section);
        for (let i = 3; i < word.length; i++) {
            if (!currentDirectory.has(word[i])) {
                currentDirectory.set(word[i], new Map());
            } 
            currentDirectory = currentDirectory.get(word[i]);
        }
    }

    const end = Date.now();

    console.log("parsed words in:", end - start, "ms");

    return map;
}	

// Creates a hashmap where each tile index points to its letter.
function createIndexMap(board) {
    const map = new Map();

    for (let i = 0; i < board.length; i++)
        map.set(i, board[i]);

    return map;
}

// Creates a hashmap where each tile points to its neighbors for easy access.
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
