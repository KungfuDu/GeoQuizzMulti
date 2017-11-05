var expect = require('chai').expect,
    Player = require('../lib/Player')

describe('Unit Test For Player Class', function () {

    describe("Test CREATION", function () {
        it("should create a new Instance of Player", function () {
            let player = new Player("Player " + 1, 3)
            expect(player.name).to.equal("Player 1")
            expect(player.life).to.equal(3)
            expect(player.status).to.equal(1)
        })
    })
    describe("Test Remove Life", function () {
        let player = {}
        beforeEach(function (done) {
            player = new Player("Player " + 1, 3)
            done()
        })
        it("should remove 1 life", function () {
            player.looseLife()
            expect(player.life).to.equal(2)
        })
        it("should remove 2 life", function () {
            player.looseLife(2)
            expect(player.life).to.equal(1)
        })
        it("should remove 3 life", function () {
            player.looseLife(3)
            expect(player.life).to.equal(0)
        })
    })
})
