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
                    }
                    fines = FinesCalculator.getAlchohol(offense);
                    for (var i = 0; i < fines.length; i++) {
                        if(fines[i] === null){
                        }
                        else{
                            for (var key in fines[i]) {
                                if (fines[i].hasOwnProperty(key)) {
                                    var s2 = texts[i].replace(key,fines[i][key])
                                    texts[i] = s2;
                                }
                            }
                        }
                    }
                }, function(err){
                    console.error(err);
                });
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
    var texts = [];
    return {
        getAlchohol: function(offense) {
            var query = "SELECT * FROM Texts a INNER JOIN Alchohol b ON a.id=b.text_id_1 or a.id = b.text_id_2 or a.id = b.text_id_3 WHERE b.intoxication=?";
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
.factory('Questions', function($cordovaSQLite) {
    var menu = ["Speed", "Alchohol", "Drugs", "Other"];
    return {
        getMenu: function() {
            return menu;
        },
        getQuestions: function() {
            var names = ["RIJBEWIJS","LEEFTIJD", "BESTRUUDER", "INTOXICATIE"];
            var subgroups = [['Ik bezit mijn rijbewijs minder dan 2 jaar', "Ik bezit mijn rijbewijs langer dan 2 jaar"],
            ["Jonger dan 18 jaar","18 jaar of ouder"],
            ["Professionele bestuurder", "Gewone bestuurder"],
            ["0,20 - 0,50 promille",
            "0,50 – 0,80 Promille",
            "0,80 – 1,00 Promille",
            "1,00 – 1,14 Promille",
            "1,14 – 1,48 Promille",
            "1,48 - ... Promille",
            "Weigering ademtest of analyse zonder wettige reden",
            "Dronkenschap",
            "Eerder betrapt op alcoholintoxicatie van meer dan 0,8 Promille of dronkenschap en nu opnieuw betrapt op alcoholintoxicatie van meerdan 0,8 Promille.",
            "Eerder betrapt op alcoholintoxicatie van meer dan 0,8 Promille of dronkenschap en nu opnieuw betrapt op dronkenschap"]];
            var groups = [];
            groups.push(names);
            groups.push(subgroups);
            return groups;
        }
    }
})
