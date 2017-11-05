
var Response = require('./lib/responseHelper')
var GameEngine = require('./lib/gameEngine')
var Handler = require('./lib/intentsHandler')


exports.handler = function (event, context) {
  Handler.init(event.session).then(function () {

    if (event.session.new) {
      onSessionStarted({ requestId: event.request.requestId }, event.session);
    }
    if (event.request.type === "LaunchRequest") {
      onLaunch(event.request,
        event.session,
        function callback(sessionAttributes, speechletResponse) {
          context.succeed(buildResponse(sessionAttributes, speechletResponse))
        })
    } else if (event.request.type === "IntentRequest") {
      try {
        onIntent(event.request,
          event.session,
          function callback(sessionAttributes, speechletResponse) {
            context.succeed(buildResponse(sessionAttributes, speechletResponse));
          });
      } catch (err) {
        Raven.captureException(err);
        errorReply(err,function callback(sessionAttributes, speechletResponse) {
          context.succeed(buildResponse(sessionAttributes, speechletResponse));
        });
      }

    } else if (event.request.type === "SessionEndedRequest") {
      onSessionEnded(event.request, event.session);
      context.succeed();
    }
  }).catch(function (err) {
    console.error(err)
    Raven.captureException(err);
    errorReply(err,function callback(sessionAttributes, speechletResponse) {
      context.succeed(buildResponse(sessionAttributes, speechletResponse))
    });
    // context.fail("Exception: " + err);
  })

};

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {

  var intent = intentRequest.intent
  var intentName = intentRequest.intent.name;
å
  if (intentName == "AMAZON.YesIntent") {

  } else if (intentName == "PrevIntent") {

  } else if (intentName == "NextIntent") {

  } else if (intentName == "AMAZON.NoIntent") {

  } else if (intentName == "AMAZON.HelpIntent") {
    Handler.handleHelpIntent(intent, session, callback)
  } else if (intentName == "AMAZON.StopIntent") {
    callback([], Response.buildSpeechletResponse('Geo Quizz', 'OK, bye bye.', '', true))
  } else {
    throw "Invalid intent :" + intentName
  }

}
function errorReply(err,callback) {
  callback([], Response.buildSpeechletResponse('Error', "Oops : "+ err, '', true))
}
function onLaunch(launchRequest, session, callback) {
  getWelcomeResponse(callback)
}

function getWelcomeResponse(callback) {
  let speechOutput = "Welcome to GeoQuizz, powered by Kungfu"
  let reprompt = "What are you looking for ?"
  let header = "Geo Quizz"
  let shouldEndSession = false
  let sessionAttributes = {
    "speechOutput": speechOutput,
    "reprompt": reprompt
  }
  callback(sessionAttributes, Response.buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession))
}
/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
  //
}

// Response BUILDER \\
function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}
