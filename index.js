const api       = require('./api');
const encodeUrl = require('encodeurl');

module.exports = function(bp) {
  bp.middlewares.load();

   bp.hear(/[\u0590-\u05FF]/, event => {
    let term = encodeUrl(event.text);
    console.log(term);
    api.sendRequest(`http://localhost:3001/api/songs/name/${term}`).then(data => {
        console.log(data);
        data = JSON.parse(data);

        data.map(function (item) {
            let text = item.lyrics.split(',' || '\n');
            let random = Math.floor((Math.random() * (text.length - 2)) + 2);

            if (text[random].length >= 300) {
                text[random] = text[random].slice(1, 299);
            }

            bp.messenger.sendText(event.user.id, text[random]);
            return null;
        });

        })
    });

    bp.hear('alex', event => {
        bp.messenger.sendText(event.user.id, "Alex is the man");
    })
};
