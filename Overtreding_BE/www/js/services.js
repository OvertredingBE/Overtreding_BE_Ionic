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
    var others = [];

    return {
        all: function() {
            return offenses;
        },
        searchOthers: function(tag){
            db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
            var query = "SELECT * FROM Other_Tags where tag_name = ?";
            $cordovaSQLite.execute(db, query, [tag]).then(function(res){
                if(res.rows.length > 0){
                    for(var i = 0; i < res.rows.length; i++){
                        var query = "SELECT * FROM Other where id = ?";
                        $cordovaSQLite.execute(db, query, [res.rows.item(i).offense_id]).then(function(res){
                            if(res.rows.length > 0){
                                for(var i = 0; i < res.rows.length; i++){
                                    others.push(res.rows.item(i).description);
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
            return others;
        },
        add: function(offense) {
            offenses.push(offense);
        },
        findById: function(offenseId){
            return offenses[offenseId];
        },
        createDefault: function(type){
            var offense = null;
            switch (type) {
                case "Alchohol":
                offense =  {
                    licence: -1,
                    age:-1,
                    driver:-1,
                    intoxication:-1,
                    type:"Alchohol"
                };
                break;
                case "Drugs":
                offense =  {
                    licence: -1,
                    age:-1,
                    blood_test:-1,
                    type:"Drugs"
                };
                break;
                case "Speed":
                offense =  {
                    licence: -1,
                    age:-1,
                    road:-1,
                    speed_limit: 0,
                    speed_driven: 0,
                    speed_corrected: 0,
                    type:"Speed"
                };
                break;
                default:
            }
            return offense;
        },
        getFieldName: function(groupId, type){
            var fieldName = null;
            switch (groupId) {
                case 0:
                fieldName = "licence";
                break;
                case 1:
                fieldName = "age";
                break;
                default:
            }
            switch (type) {
                case "Alchohol":
                switch (groupId) {
                    case 2:
                    fieldName = "driver";
                    break;
                    case 3:
                    fieldName = "intoxication";
                    break;
                    default:
                }
                break;
                case "Drugs":
                switch (groupId) {
                    case 2:
                    fieldName = "blood_test";
                    break;
                    default:
                }
                break;
                case "Speed":
                switch (groupId) {
                    case 2:
                    fieldName = "road";
                    break;
                    case 3:
                    fieldName = "speed_limit";
                    break;
                    case 4:
                    fieldName = "speed_driven";
                    break;
                    case 5:
                    fieldName = "speed_corrected";
                    break;
                    default:
                }
                break;
                default:
            }
            return fieldName;
        }
    };
})
.factory('Questions', function($cordovaSQLite) {
    var menu = ["Speed", "Alchohol", "Drugs", "Other"];
    return {
        getMenu: function() {
            return menu;
        },
        getQuestions: function(name) {
            switch (name) {
                case "Alchohol":
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
                break;
                case "Drugs":
                var names = ["RIJBEWIJS","LEEFTIJD", "TYPE OVERTREDING"];
                var subgroups = [['Ik bezit mijn rijbewijs minder dan 2 jaar', "Ik bezit mijn rijbewijs langer dan 2 jaar"],
                ["Jonger dan 18 jaar","18 jaar of ouder"],
                ["Blood test", "Refused test"]];
                var groups = [];
                groups.push(names);
                groups.push(subgroups);
                break;
                case "Speed":
                var names = ["RIJBEWIJS","LEEFTIJD", "TYPE RUJBAAN", "SNEIHELDSLIMIET"];
                var subgroups = [['Ik bezit mijn rijbewijs minder dan 2 jaar', "Ik bezit mijn rijbewijs langer dan 2 jaar"],
                ["Jonger dan 18 jaar","18 jaar of ouder"],
                ["Woonerf, zone 30, etc", "Andere wegen"],
                ["10","20","30","40","50","60","70","80","90","100","110","120",]];
                var groups = [];
                groups.push(names);
                groups.push(subgroups);
                break;
                default:

            }
            return groups;
        }
    }
})
.factory('ResultTexts', function($cordovaSQLite, FinesCalculator) {
    var texts = [];
    var fines = [];
    db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
    return {
        getTexts: function(offense) {
            texts.length = 0;
            fines.length = 0;
            if(offense.age === 1){
                var query = "SELECT * FROM Texts WHERE id = ? OR id = ? OR id = ?";
                $cordovaSQLite.execute(db, query, [9, 10, 11]).then(function(res){
                     if(res.rows.length > 0){
                         for(var i = 0; i < res.rows.length; i++){
                             texts.push(res.rows.item(i).body);
                         }
                     }
                 }, function(err){
                     console.error(err);
                 });
             }
             else{
            switch (offense.type) {
                case "Alchohol":
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
                break;
                case "Drugs":
                var query = "SELECT * FROM Texts a INNER JOIN Drugs b ON a.id=b.text_id_1 or a.id = b.text_id_2 or a.id = b.text_id_3";
                $cordovaSQLite.execute(db, query, []).then(function(res){
                    if(res.rows.length > 0){
                        for(var i = 0; i < res.rows.length; i++){
                            texts.push(res.rows.item(i).body);
                        }
                    }
                }, function(err){
                    console.error(err);
                });
                break;
                case "Speed":
                var exceed = FinesCalculator.calculateExceed(offense.speed_limit, offense.speed_corrected);

               var query = "SELECT * FROM Texts a INNER JOIN Speed b ON a.id=b.text_id_1 OR a.id = b.text_id_2 OR a.id = b.text_id_3 WHERE b.exceed = ? AND b.road = ?";
               $cordovaSQLite.execute(db, query, [exceed, offense.road]).then(function(res){
                    if(res.rows.length > 0){
                        for(var i = 0; i < res.rows.length; i++){
                            texts.push(res.rows.item(i).body);
                        }
                    }
                }, function(err){
                    console.error(err);
                });
                break;
                default:

            }
            fines = FinesCalculator.getFines(offense);

             for (var key in fines) {
                 if (fines.hasOwnProperty(key)) {
                     texts.push(key + " -> " + fines[key])
                 }
             }

        }


            return texts;
        }
    }
})
.factory('FinesCalculator', function($cordovaSQLite, Formulas) {
    var sd =  function(speedLimit, speedDriven){
            speedLimit = (speedLimit+1)*10;
            var difference = speedDriven - speedLimit;
            if(difference > 40){
                return 4;
            }
            if(difference > 30){
                return 3;
            }
            if(difference > 20){
                return 2;
            }
            if(difference > 10){
                return 1;
            }
            if(difference > 1){
                return 0;
            }
            return - 1;
        }
    return {
        getFines: function(offense) {
            var formulaIds = [];
            switch (offense.type) {
                case "Alchohol":
                formulaIds.push(2);
                switch (offense.intoxication) {
                    case 0:
                    case 1:
                    formulaIds.push(7);
                    break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    formulaIds.push(8);
                    break;
                    case 8:
                    formulaIds.push(9);
                    break;
                    case 9:
                    formulaIds.push(10);
                    break;
                    default:
                }
                break;
                case "Drugs":
                formulaIds.push(2);
                formulaIds.push(8);
                break;
                case "Speed":
                var exceed = sd(offense.speed_limit, offense.speed_corrected);
                formulaIds.push(1);
                formulaIds.push(2);
                switch (exceed) {
                    case 1:
                    case 2:
                        if(offense.road === 0){
                            formulaIds.push(3);
                            formulaIds.push(4);
                        }
                        else{
                            formulaIds.push(5);
                            formulaIds.push(6);
                        }
                    break;
                    case 3:
                    formulaIds.push(5);
                    formulaIds.push(6);
                    break;
                    default:
                }
                break;
                default:
            }

            var obj = {};
            for (var i = 0; i < formulaIds.length; i++) {
                var key = "#TOTALAMOUNT" + formulaIds[i] + "#";
                obj[key] = Formulas.getResultForFormula(formulaIds[i], offense);

            }
            return obj;
        },
        calculateExceed: function(speedLimit, speedDriven){
            speedLimit = (speedLimit+1)*10;
            var difference = speedDriven - speedLimit;
            if(difference > 40){
                return 4;
            }
            if(difference > 30){
                return 3;
            }
            if(difference > 20){
                return 2;
            }
            if(difference > 10){
                return 1;
            }
            if(difference > 1){
                return 0;
            }
            return - 1;
        }
    }
})
.factory('Formulas', function($cordovaSQLite){
    return{
        getResultForFormula: function(formulaId, offense){
            var diff = -1;
            if(offense["type"] === "Speed"){
                speedLimit = (offense.speed_limit+1)*10;
                diff = offense.speed_corrected - speedLimit;
            }
            switch (formulaId) {
                case 1:
                return calc1(10) + " tot " + calc1(500);
                break;
                case 2:
                return calc2(25);
                break;
                case 3:
                return calc3(50, 10, diff);
                break;
                case 4:
                return calc3(60,10, diff);
                break;
                case 5:
                return calc3(50,5, diff);
                break;
                case 6:
                return calc3(60,5, diff);
                break;
                case 7:
                return calc1(25) + " tot " + calc1(500);
                break;
                case 8:
                return calc1(200) + " tot " + calc1(2000);
                break;
                case 9:
                return calc1(400) + " tot " + calc1(5000);
                break;
                case 10:
                return calc1(800) + " tot " + calc1(10000);
                break;
                default:
            }
        }
    }
    function calc1(y){
        return y*6 + 100;
    };
    function calc2(y){
        return y*6;;
    };
    function calc3(y,x,z){
        return y + (x * z);
    };
})
