'use strict';

angular.module('myApp.voice', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state("voice", {
        url: "/voice",
        views: {
            "viewA": { 
                templateUrl: "app/voice/top.html", 
                controller: function($scope, $http, $timeout) {
                    $scope.something = "hello, world";

                    $http({ method: 'GET', url: '/data/cards' })
                        .then(function(response) { 
                            if(response.data) { 
                                $scope.cards = response.data;

                                $timeout(function() {
                                    // speak(cards[0].question);
                                    $scope.listening = true;
                                    listen().then(function(x) {
                                        console.log(x);
                                        $scope.listening = false;
                                    });
                                }, 1000);
                            } else {
                            }
                        });
                }
            }
        }
    });
}]);

// move these into the controller
function speak(card) { 

}

function listen() {
    return new Promise(function(resolve, rejecxt) { 
        var sr = Microsoft.ProjectOxford.SpeechRecognition; // save typing

        var key = "5c6413f3ef734186ad48b141f687b6e6";
        var appKey = "7d142ecb-cd14-4e87-8d64-dfe7deeec248";
        var subKey = "fa9ab822b01d4d9e85d1e77febbdabc1";
        var language = "en-us";

        var mode = sr.SpeechRecognitionMode.shortPhrase;
        var client = sr.SpeechRecognitionServiceFactory.createMicrophoneClientWithIntent(
            language, key, key, appKey, subKey);

        client.startMicAndRecognition();
        setTimeout(function() {
            client.endMicAndRecognition();
        }, 5000);

        client.onFinalResponseReceived = function(response) { 
            console.log(response);
            var text = response[0].display;

            // luis
            //https://api.projectoxford.ai/luis/v1/application?id=0529fbc1-4b08-49eb-922f-8009205ec6ee&subscription-key=fa9ab822b01d4d9e85d1e77febbdabc1&q=hello%20world

            var queryBase = "https://api.projectoxford.ai/luis/v1/application?id=7d142ecb-cd14-4e87-8d64-dfe7deeec248&subscription-key=fa9ab822b01d4d9e85d1e77febbdabc1&q=";
            var query = queryBase + encodeURIComponent(text);

            console.log(query);

            $.get(query, {}, function(data, status, jqXHR) {
                console.log(data);

                var intent = data.intents[0];

                if(intent.intent === "StopIntent") {
                    console.log("stop");
                } else if(intent.intent === "StartIntent") {
                    console.log("start");
                }

                resolve({ text: text, intent: intent.intent })

            });
        }
    });
}