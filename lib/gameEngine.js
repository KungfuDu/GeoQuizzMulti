var Questions = require('./lib/Questions')
var Player = require('./lib/Player')

var GameEngine = {
    players: [],
    questionsAvailable: [],
    questionsAnswered: [],
    currentQuestion: null,
    currentPlayer: null,
    initGame(session) {
        this.players = session.players
        this.questionsAvailable = session.questionsAvailable
        this.questionsAnswered = session.questionsAnswered
        this.currentQuestion = sessions.currentQuestion
        return this
    },
    createGame(playerCount, lifeNumber){
        self = this
        return new Promise((resolve, reject) => {
            for (let i = 0; i < playerCount; i++) {
                self.players[] = new Player('Player ' + i, lifeNumber)
            }
            new Question('Geography').generateShuffle().then((questions) => {
                self.questionsAvailable = questions
                let response = "New game ready, " + self.player.length + " players with " + lifeNumber + " lives per player."
                resolve(response, self)
            }).catch( (err) => {
                reject(err)
            })

        })

    },
    nextRound(){

    }

}

module.exports = GameEngine
