module.exports = class Player {
    constructor(name, lifeCount, status = 1) {
        this.name = name
        this.life = lifeCount
        this.status = status
    }
    die() {
        this.life = 0
        this.status = 0
    }
    looseLife(number = 1) {
        this.life -= number
        return this.life
    }
    isAlive(){
        return this.life > 0
    }
}
