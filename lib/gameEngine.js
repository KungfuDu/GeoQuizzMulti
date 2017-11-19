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
        return new Promise((resolve, reject) => {
            for (let i = 0; i < playerCount; i++) {
                this.players[] = new Player('Player ' + i, lifeNumber)
            }
            new Question('Geography').generateShuffle().then((questions) => {
                this.questionsAvailable = questions
                resolve(this.players.length)
            }).catch( (err) => {
                reject(err)
            })

        })

    },
    playTurn(){

    }

}

module.exports = GameEngine
