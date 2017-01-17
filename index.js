const api = require('./api');

module.exports = function(bp) {
  bp.middlewares.load()

   bp.hear('שלום', event => { // Capture messages that are 'hello'
    // Respond to the user with 'Hello, world!'
    api.sendRequest('http://localhost:3010/api/songs/lyrics/%D7%90%D7%97%D7%A8%D7%AA').then(data => {
        let lyrics;
        data = JSON.parse(data);
        console.log(data);
        data.map(function (item) {
            // lyrics = text.slice(1, 15)
            // console.log(lyrics);
            //  bp.messenger.sendText(event.user.id, lyrics);
        });

        })
    });

    bp.hear('alex', event => {
        bp.messenger.sendText(event.user.id, "Alex is the man");
    })
}
