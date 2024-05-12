const fetchValidWords = () => {
    return fetch('../words.txt')
        .then(response => response.text())
        .then(data => {
            let validWords = data.split(/\r?\n/)
            validWords = new Set(validWords);
            return validWords;
        })
        .catch(error => {
            console.error(error);
        });
}

export { fetchValidWords };
