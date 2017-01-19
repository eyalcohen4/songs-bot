const api       = require('./api');
const encodeUrl = require('encodeurl');

const options = {
    typing:   true,
    waitRead: true,
};

function getByNameSuccess() {

}

function getByNameError() {

}

module.exports = function(bp) {
  bp.middlewares.load();

    bp.hear("something", event => {
        bp.messenger.sendText(event.user.id, "something")
        let handled = false
        bp.hear({text: 'Another',  "user.id": event.user.id}, (event, next) => {
            if (handled) { return next() }
            handled = true
            bp.messenger.sendText(event.user.id, "Another Something")
        })
    })

   bp.hear(/[\u0590-\u05FF]/, (event, next) => {
       let term = encodeUrl(event.text);
        api.sendRequest(`http://localhost:3001/api/songs/name/${term}`).then(data => {
            data = JSON.parse(data);
            if (data.length === 0) {
                bp.messenger.sendText(event.user.id, `${event.user.first_name} ${event.user.last_name}, אני באמת לא מבין אותך`);
            }
            data.map(function (item) {
                let text = item.lyrics.split(',' || '\n');
                let random = Math.floor((Math.random() * (text.length - 2)) + 2);

                text = (text[random] >= 300) ? text[random].slice(1, 299) : text[random];

                bp.messenger.sendText(event.user.id, `${text} \n תמשיך אותי ${event.user.first_name}`);
            });
        }, error => {
            console.log(error);
            bp.messenger.sendText(event.user.id, `${event.user.first_name} ${event.user.last_name}, אני באמת לא מבין אותך`);
       })
    });

    bp.hear('alex', event => {
        bp.messenger.sendText(event.user.id, "Alex is the man");
    })
    };
