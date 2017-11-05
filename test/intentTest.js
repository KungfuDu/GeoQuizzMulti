var expect = require('chai').expect,
    lambdaToTest = require('../index')

const context = require('aws-lambda-mock-context');
var ctx = {}

describe('When Starting a Session', function () {
    var speechResponse = null,
        speechError = null

    // Fires once for the group of tests, done is mocha's callback to
    // let it know that an   async operation has completed before running the rest
    // of the tests, 2000ms is the default timeout though
    before(function (done) {
        ctx = context()
        //This fires the event as if a Lambda call was being sent in
        let lauchRequestJson = require("./intentJsons/lauchRequest.json")
        lambdaToTest.handler( lauchRequestJson, ctx)

        //Captures the response and/or errors
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })


    describe('The response is structurally correct for Alexa Speech Services', function () {
        it('should not have errored', function () {
            expect(speechError).to.be.null
        })

        it('should have a version', function () {
            expect(speechResponse.version).not.to.be.null
        })

        it('should have a speechlet response', function () {
            expect(speechResponse.response).not.to.be.null
        })

        it('should have session attributes', function () {
            expect(speechResponse.response.sessionAttributes).not.to.be.null
        })

        it('should leave the Alexa session open', function () {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.false
        })
    })
})


describe('When asking for a DailyBreifing', function () {
    var speechResponse = null,
        speechError = null

    describe('The response is structurally correct for a today daily briefing', function () {

        before(function (done) {
            initIntent("./intentJsons/daybriefingNoDate.json",done)
        })
        dailyBriefingCheck()
    })

    describe('The response is structurally correct for a the 22nd of September daily briefing', function () {
        before(function (done) {
            initIntent("./intentJsons/daybriefingDate.json",done)
        })
        dailyBriefingCheck()
        it('should have 22 sept title', function () {
            expect(speechResponse.response.card.title).to.equal('Daily Briefing : 22/09/2017')
        })
    })

    function initIntent(name, done) {
        ctx = {}
        ctx = context()

        //This fires the event as if a Lambda call was being sent in
        let dailybriefJson = require(name)
        lambdaToTest.handler(dailybriefJson, ctx)

        //Captures the response and/or errors
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    }


describe('When asking for a Monthly briefing', function () {
    var speechResponse = null
    var speechError = null

    describe('The response is structurally correct for a monthly briefing', function () {

        before(function (done) {
            initIntent("./intentJsons/monthBriefing.json", done)
        })
        monthBriefingCheck()
    })

    function initIntent(name, done) {
        ctx = {}
        ctx = context()

        //This fires the event as if a Lambda call was being sent in
        let dailybriefJson = require(name)
        lambdaToTest.handler(dailybriefJson, ctx)

        //Captures the response and/or errors
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    }

})


