const copyStats = (board, seed, daily, size) => {
    let copyVal = "";

    copyVal += "Words: " + (document.getElementById("words-amount").innerText || 0) + "\n";
    copyVal += "Score: " + (document.getElementById("score-amount").innerText || 0) + "\n";

    if (daily)
        copyVal += "Daily\n";
    else
        copyVal += "Seed: " + seed + "\n";

    for (let i = 0; i < board.length; i++) {
        copyVal += `:regional_indicator_${board[i]}: `;
        if ((i + 1) % Math.sqrt(board.length) === 0)
            copyVal += "\n";
    }

    copyVal += "\n" + new URL(location.href).origin;
    if (daily)
        copyVal += "?daily=true";
    else
        copyVal += `?seed=${seed}&size=${size}`;

    navigator.clipboard.writeText(copyVal);
    console.log(copyVal);
}

export { copyStats };
