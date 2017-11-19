var request = require('request')
var fs = require('fs')
module.exports = class Question {
    constructor(theme) {
        this.theme = theme
    }
    generateShuffle() {
        return new Promise((resolve, reject) => {
            if (this.theme == "Geography") {
                geoQuestion(resolve, reject)
            }
        })
    }

}

function readFile(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url,(err, data) => {
            if ( err ) {
                return reject(err)
            }
            resolve(JSON.parse(data))
        })
    })
}

function geoQuestion(resolve, reject) {
    readFile('./questions/geoquestion.json').then((data) => {
        let countries_list = data.countries
        let questions = []

        //Suffle the array
        let j, x, i
        for (i = countries_list.length - 1; i > 0; i--) {
            x = countries_list[i]
            countries_list[i] = countries_list[j]
            countries_list[j] = x
        }
        console.log(countries_list.length);

        countries_list.splice(-1, 1)
        let questionType, question, answer
        for (let l = 0; l < countries_list.length; l++) {
            if (countries_list[l].countryName) {
                questionType = Math.floor(Math.random() * 3) + 1
                if (l == (countries_list.length - 1 )) {
                    questionType = 1
                }

                question = ""
                answer = ""

                switch (questionType) {
                    case 1:
                        question = "In which continent is " + countries_list[l].countryName
                        answer = countries_list[l].continent
                        break
                    case 2:
                        question = "Is " + countries_list[l].countryName + " more populated than " + countries_list[l+1].countryName
                        answer = (parseInt(countries_list[l].population) > parseInt(countries_list[l+1].population)) ? "yes" : "no"
                        break
                    case 3:
                        question = "Is " + countries_list[l].countryName + " bigger than " + countries_list[l + 1].countryName
                        answer = (parseInt(countries_list[l].areaInSqKm) > parseInt(countries_list[l + 1].areaInSqKm)) ? "yes" : "no"

                        break
                    default:
                        break
                }
                questions.push({
                    "question": question,
                    "response": answer
                })
            }
        }
        // shuffle again
        for (i = questions.length - 1; i > 0; i--) {
            x = questions[i]
            questions[i] = questions[j]
            questions[j] = x
        }
        questions.splice(-1, 1)
        resolve(questions)
    }).catch((err) => {
        reject(err)
    })
}
