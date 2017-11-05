var request = require('request')
var Questions = require('./lib/Questions')
var Player = require('./lib/Player')

var GameEngine = {
    players: [],
    questionsAvailable: [],
    questionsAnswered: [],
    initGame(session) {
        return
    },
    createGame(playerCount, lifeNumber){
        for ( let i = 0; i < playerCount; i++ ){
            this.players[] = new Player('Player '+i, lifeNumber)
        }
        this.questions  = Questions.suffleQuestion();
        return "Ready to play"
    }

}

module.exports = GameEngine
