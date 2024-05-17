const showWords = (words) => {
    // Sort words in descending order of length.
    words = words.sort((a, b) => b.length - a.length);

    const wordScreen = document.createElement("div");
    wordScreen.id = "word-screen";
    let currentColumn;
    let currentLength = 0;

    for (let i = 0; i < words.length; i++) {
        if (currentLength !== words[i].length) {
            const column = document.createElement("div");
            column.className = "column";
            currentColumn = column;
            currentLength = words[i].length;
            wordScreen.append(column);
        }

        const entry = document.createElement("p");
        entry.innerText = words[i];
        currentColumn.append(entry);
    }

    const closeButton = document.createElement("button");
    closeButton.id = "close-words";
    closeButton.innerText = "Close";
    wordScreen.append(closeButton);

    document.body.append(wordScreen);

    document.getElementById("close-words").onclick = () => {
        document.getElementById("word-screen").remove();
    }
}

export { showWords };
