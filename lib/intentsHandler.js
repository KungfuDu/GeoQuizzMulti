var Response = require('./responseHelper')
var GameEngine = require('./gameEngine')
var moment = require('moment')

module.exports = {
    init(session) {
        return
    },
    handleCreateGameIntent(intent, session, callback){
        let playersCount, lifesCount
        GameEngine.createGame(playersCount, lifesCount).then((response,game) => {
            secondResponse = game.nextRound()
            response = response + secondResponse
            callback(game, Response.buildSpeechletResponse('Multi Quizz Start !', response, secondResponse, false))
        })
    }
}


