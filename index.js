const api       = require('./api');
const encodeUrl = require('encodeurl');
const helpers   = require('./helpers');
const options = {
    typing:   true,
    waitRead: true,
};
/*
Example for multiple hearing:

 bp.hear("something", event => {
     bp.messenger.sendText(event.user.id, "something")
     bp.hear({text: 'Another',  "user.id": event.user.id}, (event, next) => {
         if (handled) { return next() }
         handled = true
         bp.messenger.sendText(event.user.id, "Another Something")
     })
 })

*/
module.exports = function(bp) {
  bp.middlewares.load();

   bp.hear(/[\u0590-\u05FF]/, (event, next) => {
       let handled = false;

       api.getSongByName(event.text).then(data => {
           if (data.length === 0) {
               bp.messenger.sendText(event.user.id, `${event.user.first_name} ${event.user.last_name}, אני באמת לא מבין אותך`);
           }

           let song = helpers.songToRow(data);

            bp.messenger.sendText(event.user.id, `${song.line} \n תמשיך אותי ${event.user.first_name}`);
            let payload = {
                   template_type: "generic",
                   elements: [{
                       title: 'מה ההמשך?',
                       buttons: [ {
                           type: 'postback',
                           title: song.nextLine,
                           payload: 'great!',
                       }]
                   }]
           };
           bp.messenger.sendTemplate(event.user.id, payload);

       });
    });

    bp.hear('alex', event => {
        bp.messenger.sendText(event.user.id, "Alex is the man");
    })
    };
