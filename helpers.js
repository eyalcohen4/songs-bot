function songToRow(song) {
    song = JSON.parse(song);
    let row = null;

    song.map(function (item) {
        let text = item.lyrics.split(',' || '\n');
        let random = Math.floor((Math.random() * ((text.length - 1) - 2)) + 2);
        row = {
            line: (text[random] >= 300) ? text[random].slice(1, 299) : text[random],
            nextLine: (text[random + 1] >= 300) ? text[random].slice(1, 299) : text[random + 1],
        }
    });

    if (row) {
        return row;
    }
}

module.exports = {
    songToRow: songToRow,
};
