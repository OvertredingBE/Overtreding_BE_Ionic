/**
* Created by MartinDzhonov on 6/1/15.
*/
angular.module('starter.services', [])
.factory('Rights', function($cordovaSQLite) {

    var alchRights = [];
    var drugsRights = [];
    db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
    var query = "SELECT * from Rights where type = 1";
    $cordovaSQLite.execute(db, query, []).then(function(res){
        if(res.rows.length > 0){
            for(var i = 0; i < res.rows.length; i++){
                drugsRights.push({id: res.rows.item(i).id, body: res.rows.item(i).body});
            }
        }
    }, function(err){
        console.error(err);
    });
    query = "SELECT * from Rights where type = 0";
    $cordovaSQLite.execute(db, query, []).then(function(res){
        if(res.rows.length > 0){
            for(var i = 0; i < res.rows.length; i++){
                alchRights.push({id: res.rows.item(i).id, body: res.rows.item(i).body});
            }
        }
    }, function(err){
        console.error(err);
    });

    return {
        alchRights: function() {
            return alchRights;
        },
        drugRights: function() {
            return drugsRights;
        }
    };
})
.factory('Offenses', function($cordovaSQLite) {

    var offenses = [];

    return {
        all: function() {
            return offenses;
        },
        add: function(offense) {
            offenses.push(offense);
        },
        findById: function(offenseId){
            return offenses[offenseId];
        }
    };
})
.factory('ResultTexts', function($cordovaSQLite, OffenseTexts) {
    var offenses = [];

    return {
        getTexts: function(offense) {
            switch (offense.type) {
                case "Alchohol":
                offenses = OffenseTexts.getAlchohol(offense);
                break;
                case "Speed":
                // Blah
                break;
            }

            return offenses;
        }
    }
})
.factory('OffenseTexts', function($cordovaSQLite) {
    db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
    var offenses = [];

    return {
        getAlchohol: function(offense) {
            var query = "SELECT * from Alchohol";
            $cordovaSQLite.execute(db, query, []).then(function(res){
                if(res.rows.length > 0){
                    offenses.push("asd");

                }
            }, function(err){
                console.error(err);
            });
            return offenses;
        }
    };
})
// .factory("ResultTexts", function($cordovaSQLite, OffenseTexts) {
//     db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
//     var texts = [];
//     var fineAmounts = [];
//     var fullTexts = [];
//     return{
//         getTexts: function(offense){
//     switch (offense.type) {
//         case "Alchohol":
//
//         texts.push("ASD");// = OffenseTexts.getAlchohol(offense);
//         break;
//         case "Speed":
//         // Blah
//         break;
//     }
//
//     return texts;
// }
//     };
//
// })
// .factory("OffenseTexts", function($cordovaSQLite) {
//     db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
//     var texts = [];
//     return{
//         getAlchohol: function(offense){
//             texts.push("some text here");
//         }
//
//         return texts;
//     };
// })
