var Response = require('./responseHelper')
var GameEngine = require('./gameEngine')
var moment = require('moment')

module.exports = {
    init(session) {
        return new Promise((resolve, reject) => {
            resolve(GameEngine.initGame(session))
        })
    },
    handleCreateGameIntent(intent, session, callback){
        let playersCount = intent.slots.PlayerCount.value ? intent.slots.PlayerCount.value : 1
        let lifesCount = intent.slots.LifeCount.value ? intent.slots.LifeCount.value : 1

        GameEngine.createGame(playersCount, lifesCount).then((res) => {
            callback(res.game, Response.buildSpeechletResponse('Multi Quizz Start !', res.response, res.secondeResponse, false))
        })
    },
    handleAnswerIntent(answer, intent, session, callback) {
        GameEngine.nextRound(answer).then((res) => {
            callback(res.game, Response.buildSpeechletResponse('Multi Quizz !', res.response, res.secondeResponse, false))
        })
    }
}


