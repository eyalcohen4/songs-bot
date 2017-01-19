const request   = require('request');
const encodeUrl = require('encodeurl');
const API_URL = 'http://localhost:3001/api/songs/';

class Api {

    sendRequest(url, resolve, reject) {
        return new Promise(function (resolve, reject) {
            return request(url, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error)
                }
            });
        });
    }

    getSongByName(name) {
        name = encodeUrl(name);
        return this.sendRequest(`${API_URL}name/${name}`);
    }
}

module.exports = new Api();
