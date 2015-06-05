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
.factory('ResultTexts', function($cordovaSQLite, OffenseTexts, FinesCalculator) {
    var texts = [];
    var fines = [];
    var composedTexts = [];
    //var composedTexts = [];
    return {
        getTexts: function(offense) {
            switch (offense.type) {
                case "Alchohol":
                var query = "SELECT * FROM Texts a INNER JOIN Alchohol b ON a.id=b.text_id_1 or a.id = b.text_id_2 or a.id = b.text_id_3 WHERE b.intoxication=?";
                //var query = "SELECT * from Alchohol where intoxication = ?";
                $cordovaSQLite.execute(db, query, [offense.intoxication]).then(function(res){
                    if(res.rows.length > 0){
                        for(var i = 0; i < res.rows.length; i++){
                            texts.push(res.rows.item(i).body);
                        }

                        for (var i = 0; i < fines.length; i++) {
                            if(fines[i] === null){
                            }
                            else{
                                for (var key in fines[i]) {
                                    if (fines[i].hasOwnProperty(key)) {
                                        texts[i] = texts[i].replace(key, fines[i][key]);
                                        //texts.push(key + " -> " + fines[i][key]);
                                    }
                                }
                                //texts.push("WTF" + i);
                            }
                        }
                    }
                }, function(err){
                    console.error(err);
                });
                fines = FinesCalculator.getAlchohol(offense);
                break;
                case "Speed":
                // Blah
                break;
            }

            return texts;
        }
    }
})
.factory('OffenseTexts', function($cordovaSQLite) {
    db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
    return {
        getAlchohol: function(offense) {
            var texts = [];

            var query = "SELECT * FROM Texts a INNER JOIN Alchohol b ON a.id=b.text_id_1 or a.id = b.text_id_2 or a.id = b.text_id_3 WHERE b.intoxication=?";
            //var query = "SELECT * from Alchohol where intoxication = ?";
            $cordovaSQLite.execute(db, query, [offense.intoxication]).then(function(res){
                if(res.rows.length > 0){
                    for(var i = 0; i < res.rows.length; i++){
                        texts.push(res.rows.item(i).body);
                    }
                }
            }, function(err){
                console.error(err);
            });

            return texts;
        }
    };
})
.factory('FinesCalculator', function($cordovaSQLite, OffenseTexts) {
    var fines = [];
    fines.push(null);
    fines.push(null);
    return {
        getAlchohol: function(offense) {
            switch (offense.intoxication) {
                case 1:
                fines.push({"#TOTALAMOUNT7#" : 100, "#TOTALAMOUNT2#": 50});
                break;
                default:

            }

            return fines;
        }
    }
})
