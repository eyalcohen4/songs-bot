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
            let text = item.lyrics.split(',');
            let random = Math.floor((Math.random() * (20 - 2)) + 2);
            console.log(text[random]);
            bp.messenger.sendText(event.user.id, text[random]);
            return null;
        });

        })
    });

    bp.hear('alex', event => {
        bp.messenger.sendText(event.user.id, "Alex is the man");
    })
};
