var request = require('request')
var GameEngine = {
    url: "",
    baseRequest: {

    },
    session_obj: {

    },
    init(session) {
        return
    },
    makeRequest(url, data) {
        return new Promise((resolve, reject) => {
            request.post({
                url: url,
                headers: {},
                form: { "request": JSON.stringify(data) },
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return reject(err)
                }
                return resolve(JSON.parse(body).response)
            })
        })
    },
}

module.exports = GameEngine
