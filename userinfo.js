/**
 * Inrhythm Engineers Information
 *
 */

/*jslint node: true */

"use strict";

var fs = require('fs');
var inquirer = require("inquirer");

console.log("Hi, welcome to InRhythm \n");

//Questions for Engineers

var questions = [
    {
        type: "input",
        name: "name",
        message: "What is your Name ?"

    },
    {
        type: "input",
        name: "phone",
        message: "What's your phone number ?",
        validate: function( value ) {
            var pass = value.match(/^([01]{1})?[\-\.\s]?\(?(\d{3})\)?[\-\.\s]?(\d{3})[\-\.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
            if (pass) {
                return true;
            } else {
                return "Please enter a valid phone number";
            }
        }
    },
    {
        type: "input",
        name: "gravatar",
        message: "Please enter the gravatar link :-",
        validate: function( value ) {
            var pass = value.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
            if (pass) {
                return true;
            } else {
                return "Please enter link";
            }
        }
    },
    {
        type: "input",
        name: "twitter",
        message: "Please enter your twitter handle :-",
        filter: function(val){
            return "https://twitter.com/" + val;
        }
    },
    {
        type: "input",
        name: "github",
        message: "Please enter your github handle :-",
        filter: function(val){
            return "https://github.com/" + val;
        }

    },
    {
        type: "input",
        name: "linkedin",
        message: "Please enter your linkedin profile link :-",
        validate: function( value ) {
            var pass = value.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
            if (pass) {
                return true;
            } else {
                return "Please enter link";
            }
        }
    }

];

inquirer.prompt( questions, function( answers ) {
    var outputFilename = 'engineers/' + answers.name.replace(/\s/gi, "_") + ".json";
        fs.writeFile(outputFilename, JSON.stringify(answers, null, 4), function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("JSON saved to " + outputFilename);
            }
        });

});
