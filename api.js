const request = require('request');

function sendRequest(url, resolve, reject) {
    return new Promise(function (resolve, reject) {
        return request(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body);
            } else {
                reject(error)
            };
        });
    });
}

module.exports = {
    sendRequest: sendRequest,
}
