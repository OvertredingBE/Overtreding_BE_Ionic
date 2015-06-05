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
    var texts = [];

    return {
        getAlchohol: function(offense) {
            var query = "SELECT * from Alchohol where intoxication = ?";
            $cordovaSQLite.execute(db, query, [offense.intoxication]).then(function(res){
                if(res.rows.length > 0){
                    for(var i = 0; i < res.rows.length; i++){
                        var query = "SELECT * from Texts where id = ? or id = ? or id = ?";
                        $cordovaSQLite.execute(db, query, [res.rows.item(i).text_id_1, res.rows.item(i).text_id_2,res.rows.item(i).text_id_3]).then(function(res){
                            if(res.rows.length > 0){
                                for(var i = 0; i < res.rows.length; i++){
                                    texts.push(res.rows.item(i).body);
                                }
                            }
                        }, function(err){
                            console.error(err);
                        });
                    }
                }
            }, function(err){
                console.error(err);
            });
            return texts;
        }
    };
})
