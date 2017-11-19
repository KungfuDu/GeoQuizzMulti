var expect = require('chai').expect,
    Question = require('../lib/Question')

describe('Unit Test For Question Class', function () {

    describe("Test CREATION", function () {
        it("should create a new Instance of Question", function () {
            let question = new Question("Geo" )
            expect(question.theme).to.equal("Geo")

        })
    })
    describe("Test Generate Shuffle", function () {
        let question = {}
        beforeEach(function (done) {
            question = new Question("Geography")
            done()
        })
        it("should return list of question", function (done) {
            let questions = question.generateShuffle().then((data) => {
                expect(data.length).to.be.above(0)
                for (let i = 0 ; i < data.length ; i ++){
                    expect(data[i].question).to.be.a('string')
                    expect(data[i].response).to.be.a('string')
                }
                done()
            })
        })

    })
})
