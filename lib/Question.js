var request = require('request')

module.exports = class Question {
    constructor(theme) {
        this.theme = theme
    }
    generateShuffle() {
        return new Promise((resolve, reject) => {
            if (this.theme == "Geography") {
                makeRequest('http://techslides.com/demos/country-capitals.json').then((data) => {
                    let countries_list = data
                    let questions = []
                    let j, x, i;
                    for (i = countries_list.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * (i + 1));
                        x = countries_list[i];
                        countries_list[i] = countries_list[j];
                        countries_list[j] = x;
                    }
                    for (let l = 0; l < countries_list.slice(0, 100).length; l++) {
                        questions.push({
                            "question": countries_list[l].CountryName,
                            "response": countries_list[l].ContinentName
                        })
                    }
                    resolve(questions)
                }).catch( (err) => {
                    reject(err)
                })
            }
        })


    }

}

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        request.get({
            url: url,
        }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return reject(err)
            }
            return resolve(JSON.parse(body))
        })
    })
}
