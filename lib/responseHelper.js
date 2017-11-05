module.exports = {

    // -------------------- RESPONSE BUILDER --------------------- \\
    buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
        return {
            outputSpeech: {
                type: "PlainText",
                text: output
            },
            card: {
                type: "Simple",
                title: title,
                content: output
            },
            reprompt: {
                outputSpeech: {
                    type: "PlainText",
                    text: repromptText
                }
            },
            shouldEndSession: shouldEndSession
        }
    },
    buildSpeechletResponseWithCustomCard(title, output, repromptText, shouldEndSession, card) {
        return {
            outputSpeech: {
                type: "SSML",
                ssml: "<speak>" + output + "</speak>"
            },
            card: card,
            reprompt: {
                outputSpeech: {
                    type: "PlainText",
                    text: repromptText
                }
            },
            shouldEndSession: shouldEndSession
        }
    },
    cardBuilder(type, title, content, image_small = false, image_large = false) {
        if (type == "Simple") {
            return {
                type: type,
                title: title,
                content: content,
            }
        } else {
            return {
                type: type,
                title: title,
                text: content,
                image: {
                    smallImageUrl: image_small,
                    largeImageUrl: image_large
                }
            }
        }
    },
    buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
        return {
            outputSpeech: {
                type: "PlainText",
                text: output
            },
            reprompt: {
                outputSpeech: {
                    type: "PlainText",
                    text: repromptText
                }
            },
            shouldEndSession: shouldEndSession
        }
    },

}
