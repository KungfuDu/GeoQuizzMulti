
var Player = require('./Player')
var Question = require('./Question')

var GameEngine = {
    players: [],
    questionsAvailable: [],
    questionsAnswered: [],
    currentQuestion: null,
    currentPlayer: null,
    initGame(session) {
        if (session ) {
            this.players = session.players ? session.players : []
            this.questionsAvailable = session.questionsAvailable ? session.questionsAvailable : []
            this.questionsAnswered = session.questionsAnswered ? session.questionsAnswered : []
            this.currentQuestion = session.currentQuestion ? session.currentQuestion : null
            this.currentPlayer = session.currentPlayer ? new Player(session.currentPlayer.name , session.currentPlayer.life, session.currentPlayer.status) : null
        }
        return this
    },
    createGame(playerCount, lifeNumber){
        let self = this
        return new Promise((resolve, reject) => {
            self.players = []
            for (let i = 0; i < playerCount; i++) {
                self.players.push(new Player('Player ' + (i+1), lifeNumber))
            }
            self.currentPlayer = self.players[0]

            new Question('Geography').generateShuffle().then((questions) => {
                self.currentQuestion = questions.pop()
                self.questionsAvailable = questions
                let response = "New game ready, " + self.players.length + " players with " + lifeNumber + " lives per player. "
                let seconde = "First Question for "+ self.currentPlayer.name + ' : ' + self.currentQuestion.question
                response += seconde
                resolve({ response: response, secondeResponse: seconde, game : self})
            }).catch( (err) => {
                reject(err)
            })

        })

    },
    nextRound(response){
        let self = this
        return new Promise((resolve, reject) => {
            let message , next
            let correct_answer = self.currentQuestion.response
            let current_player_id = findWithAttr(self.players, 'name', self.currentPlayer.name )
            if (correct_answer == response ){
                message = "Correct !"
            } else {
                message = "Incorrect"
                if (correct_answer !== 'yes' || correct_answer !== 'no'  ) {
                    message += ' the correct answer was ' + correct_answer +' . '
                }
                if (self.currentPlayer.looseLife()) {
                    message += self.currentPlayer.name + ' has ' + self.currentPlayer.life + ' lives . '
                } else {
                    message += self.currentPlayer.name + ' has no more lives . '
                    self.players.slice(current_player_id)
                    current_player_id --
                }
            }
            current_player_id += 1
            if (current_player_id >= self.players.length) {
                current_player_id = 0
            }
            self.questionsAnswered.push(self.currentQuestion)
            self.currentQuestion = self.questionsAvailable.pop()
            self.questionsAvailable = self.questionsAvailable
            self.currentPlayer = self.players[current_player_id]

            next = "Next Question for " + self.currentPlayer.name + " . " + self.currentQuestion.question
            message += next
            resolve({ response: message, secondeResponse: next, game: self })
        })
    }
}

module.exports = GameEngine


function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
