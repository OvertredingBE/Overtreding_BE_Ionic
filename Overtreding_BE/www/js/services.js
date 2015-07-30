/**
* Created by MartinDzhonov on 6/1/15.
*/
angular.module('starter.services', [])
.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])
.factory('Questions', function($cordovaSQLite) {
    return {
        getQuestions: function(name) {
            switch (name) {
                case "Menu":
                var names = ["KIES UW TYPE OVERTREDING"];
                var subgroups = [["SNELHEID", "ALCOHOL", "DRUGS", "ANDERE"]];
                break;
                case "Alchohol":
                var names = ["RIJBEWIJS","LEEFTIJD", "BESTRUUDER", "INTOXICATIE"];
                var subgroups = [["IK BEZIT MIJN RIJBEWIJS MINDER DAN 2 JAAR", "IK BEZIT MIJN RIJBEWIJS LANGER DAN 2 JAAR"],
                ["JONGER DAN 18 JAAR","18 JAAR OF OUDER"],
                ["PROFESSIONELE BESTUURDER", "GEWONE BESTUURDER"],
                ["0,50 – 0,80 PROMILLE",
                "0,80 – 1,00 PROMILLE",
                "1,00 – 1,14 PROMILLE",
                "1,14 – 1,48 PROMILLE",
                "1,48 - ... PROMILLE",
                "WEIGERING ADEMTEST OF ANALYSE ZONDER WETTIGE REDEN",
                "DRONKENSCHAP",
                "EERDER BETRAPT OP ALCOHOLINTOXICATIE VAN MEER DAN 0,8 PROMILLE OF DRONKENSCHAP EN NU OPNIEUW BETRAPT OP ALCOHOLINTOXICATIE VAN MEERDAN 0,8 PROMILLE.",
                "EERDER BETRAPT OP ALCOHOLINTOXICATIE VAN MEER DAN 0,8 PROMILLE OF DRONKENSCHAP EN NU OPNIEUW BETRAPT OP DRONKENSCHAP"]];
                break;
                case "Drugs":
                var names = ["RIJBEWIJS","LEEFTIJD", "TYPE OVERTREDING"];
                var subgroups = [['IK BEZIT MIJN RIJBEWIJS MINDER DAN 2 JAAR', "IK BEZIT MIJN RIJBEWIJS LANGER DAN 2 JAAR"],
                ["JONGER DAN 18 JAAR","18 JAAR OF OUDER"],
                ["U WORDT POSITIEF BEVONDEN OP DE AANWEZIGHEID VAN DRUGS IN UW BLOED", "U WEIGERT ZONDER WETTIGE REDEN DE SPEEKSELTEST OF ANALYSE"]];
                break;
                case "Speed":
                var names = ["RIJBEWIJS","LEEFTIJD", "TYPE RIJBAAN", "SNELHEIDSLIMIET"];
                var subgroups = [['IK BEZIT MIJN RIJBEWIJS MINDER DAN 2 JAAR', "IK BEZIT MIJN RIJBEWIJS LANGER DAN 2 JAAR"],
                ["JONGER DAN 18 JAAR","18 JAAR OF OUDER"],
                ["WOONERF, ZONE 30, SCHOOL, BEBOUWDE KOM", "ANDERE WEGEN"],
                ["10","20","30","40","50","60","70","80","90","100","110","120"]];
                break;
                case "Other":
                var names = ["RIJBEWIJS","LEEFTIJD"];
                var subgroups = [['IK BEZIT MIJN RIJBEWIJS MINDER DAN 2 JAAR', "IK BEZIT MIJN RIJBEWIJS LANGER DAN 2 JAAR"],
                ["JONGER DAN 18 JAAR","18 JAAR OF OUDER"]];
                break;
                case "Test":
                var names = ["RIJBEWIJS","LEEFTIJD"];
                var subgroups = [['IK BEZIT MIJN RIJBEWIJS MINDER DAN 2 JAAR', "IK BEZIT MIJN RIJBEWIJS LANGER DAN 2 JAAR"],
                ["JONGER DAN 18 JAAR","18 JAAR OF OUDER"]];
                break;
                default:


            }
            var groups = [];

            for (var i=0; i<names.length; i++) {
                groups[i] = {
                    id: i,
                    name: names[i],
                    items: []
                };
                for (var j=0; j<subgroups[i].length; j++) {
                    groups[i].items.push(subgroups[i][j]);
                }
            }
            return groups;
        }
    }
})
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
.factory('Others', function($cordovaSQLite) {
    var others = [];
    return {
        searchOthers: function(tags){
            db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
            var query = "SELECT * FROM Other_Tags where tag_name = ?";
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                $cordovaSQLite.execute(db, query, [tag]).then(function(res){
                    if(res.rows.length > 0){
                        for(var i = 0; i < res.rows.length; i++){
                            var query = "SELECT * FROM Other where id = ?";
                            $cordovaSQLite.execute(db, query, [res.rows.item(i).offense_id]).then(function(res){
                                if(res.rows.length > 0){
                                    for(var i = 0; i < res.rows.length; i++){
                                        others.push({
                                            id: res.rows.item(i).id,
                                            degree: res.rows.item(i).degree,
                                            description: res.rows.item(i).description});
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
            }

            return others;
        }
    }
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
        remove: function(index){
            offenses.splice(index, 1);
        },
        clear: function(){
            console.log("clearing offenses");
            offenses = [];
        },
        findById: function(offenseId){
            return offenses[offenseId];
        },
        validateOffense: function(offense){
            var valid = true;
            for (var key in offense) {
                if (offense.hasOwnProperty(key)) {
                    if(key === "type"){

                    }else{
                        if(offense[key] === -1){
                            valid = false;
                        }
                    }
                }
            }
            return valid;
        },
        createDefault: function(type){
            var offense = {};
            offense.licence = -1;
            offense.age = -1;
            offense.type = type;
            switch (type) {
                case "Alchohol":
                offense.driver = -1;
                offense.intoxication = -1;
                break;
                case "Drugs":
                offense.blood_test = -1;
                break;
                case "Speed":
                offense.road = -1;
                offense.speed_limit = -1;
                offense.speed_driven = -1;
                offense.speed_corrected= -1;
                break;
                case "Other":
                offense.id = -1;
                offense.degree = -1;
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
    }
})
.factory('Texts', function($cordovaSQLite){
    var texts = [];
    var query = "SELECT * FROM Texts";
    db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
        $cordovaSQLite.execute(db, query,[]).then(function(res){
            if(res.rows.length > 0){
                for(var i = 0; i < res.rows.length; i++){
                    texts.push(res.rows.item(0).body);
                }
            }
        }, function(err){
            console.error(err);
        });
    return{
        getTextById: function(id) {
            console.log(texts.length);
            return texts[id-1];
        }
    }
})
.factory('ResultTexts', function($cordovaSQLite, FinesCalculator, ExceptionsService, Texts) {
    var texts = [];
    var fines = [];
    var otherTexts = [];
    db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
    var values = [10,11,9];
    var query = "SELECT * FROM Texts WHERE id = ?";
    for (var i = 0; i < values.length; i++) {
        $cordovaSQLite.execute(db, query, [values[i]]).then(function(res){
            if(res.rows.length > 0){
                for(var i = 0; i < res.rows.length; i++){
                    otherTexts.push(res.rows.item(0).body);
                }
            }
        }, function(err){
            console.error(err);
        });
    }
    return {
        getTexts: function(offense) {
            texts.length = 0;
            fines.length = 0;
            fines = FinesCalculator.getFines(offense);
            var len = 0;

            var qualifyOI = ExceptionsService.qualifyOI();
            console.log("Qualify OI: " +qualifyOI);
            console.log("-----------------------");

            var qualifyMS = ExceptionsService.qualifyMS();
            console.log("Qualify MS: " +qualifyMS);
            console.log("-----------------------");


            if(!qualifyOI){
                texts.length = 0;
                len =1;
                texts.push("U komt niet in aanmerking voor een onmiddellijke inning.");
            }
            if(!qualifyMS){
                texts.length = 0;
                len = 2;
                texts.push("U komt niet in aanmerking voor een onmiddellijke inning.");
                texts.push("U komt niet in aanmerking voor een minnelijke schikking.");
            }

            if(offense.age === 0){
                texts.length = 0;
                len =1;
                texts.push("U komt niet in aanmerking voor een onmiddellijke inning.");
            }
            if(offense.licence === 0){
                switch (offense.type) {
                    case "Speed":
                    var exceed = FinesCalculator.calculateExceed(offense.speed_limit, offense.speed_corrected);
                    if(exceed >= 2){
                        texts.length = 0;
                        len = 3;
                        texts = otherTexts;
                    }
                    break;
                    case "Alchohol":
                    if(offense.intoxication <= 5){
                        texts.length = 0;
                        len = 3;
                        texts = otherTexts;
                    }
                    break;
                    default:
                }
            }
            switch (offense.type) {
                case "Alchohol":
                var queries = ["SELECT * FROM Texts a INNER JOIN Alchohol b ON a.id=b.text_id_1 WHERE b.intoxication=?",
                "SELECT * FROM Texts a INNER JOIN Alchohol b ON a.id=b.text_id_2 WHERE b.intoxication=?",
                "SELECT * FROM Texts a INNER JOIN Alchohol b ON a.id=b.text_id_3 WHERE b.intoxication=?"];
                for (var i = len; i < queries.length; i++) {
                    var query = queries[i];
                    $cordovaSQLite.execute(db, query, [offense.intoxication]).then(function(res){
                        if(res.rows.length > 0){
                            for(var i = 0; i < res.rows.length; i++){
                                texts.push(replaceFines(res.rows.item(0).body, fines));
                            }
                        }
                    }, function(err){
                        console.error(err);
                    });
                }
                break;

                case "Drugs":
                var queries = ["SELECT * FROM Texts a INNER JOIN Drugs b ON a.id=b.text_id_1",
                "SELECT * FROM Texts a INNER JOIN Drugs b ON a.id=b.text_id_2",
                "SELECT * FROM Texts a INNER JOIN Drugs b ON a.id=b.text_id_3"];
                for (var i = len; i < queries.length; i++) {
                    var query = queries[i];
                    $cordovaSQLite.execute(db, query, []).then(function(res){
                        if(res.rows.length > 0){
                            for(var i = 0; i < res.rows.length; i++){
                                texts.push(replaceFines(res.rows.item(0).body, fines));
                            }
                        }
                    }, function(err){
                        console.error(err);
                    });
                }
                break;

                case "Speed":
                var queries = ["SELECT * FROM Texts a INNER JOIN Speed b ON a.id=b.text_id_1 WHERE b.exceed = ? AND b.road = ?",
                "SELECT * FROM Texts a INNER JOIN Speed b ON a.id=b.text_id_2 WHERE b.exceed = ? AND b.road = ?",
                "SELECT * FROM Texts a INNER JOIN Speed b ON a.id=b.text_id_3 WHERE b.exceed = ? AND b.road = ?"];
                var exceed = FinesCalculator.calculateExceed(offense.speed_limit, offense.speed_corrected);

                for (var i = len; i < queries.length; i++) {
                    var query = queries[i];
                    $cordovaSQLite.execute(db, query, [exceed, offense.road]).then(function(res){
                        if(res.rows.length > 0){
                            for(var i = 0; i < res.rows.length; i++){
                                texts.push(replaceFines(res.rows.item(0).body, fines));
                            }
                        }
                    }, function(err){
                        console.error(err);
                    });
                }
                break;

                case "Other":
                var queries = ["SELECT * FROM Texts a INNER JOIN Other b ON a.id=b.text_id_1 WHERE b.id = ?",
                "SELECT * FROM Texts a INNER JOIN Other b ON a.id=b.text_id_2 WHERE b.id = ?",
                "SELECT * FROM Texts a INNER JOIN Other b ON a.id=b.text_id_3 WHERE b.id = ?"];

                for (var i = len; i < queries.length; i++) {
                    var query = queries[i];
                    $cordovaSQLite.execute(db, query, [offense.id]).then(function(res){
                        if(res.rows.length > 0){
                            for(var i = 0; i < res.rows.length; i++){
                                texts.push(replaceFines(res.rows.item(0).body, fines));
                            }
                        }
                    }, function(err){
                        console.error(err);
                    });
                }
                break;
                default:


            }

            function replaceFines(str, fines){
                var asd = str;
                for (var key in fines) {
                    if (fines.hasOwnProperty(key)) {
                        asd = replaceAll(asd, key, fines[key] + " EUR");
                    }
                }
                return asd;
            }

            function replaceAll(str, find, replace) {
                var i = str.indexOf(find);
                if (i > -1){
                    str = str.replace(find, replace);
                    i = i + replace.length;
                    var st2 = str.substring(i);
                    if(st2.indexOf(find) > -1){
                        str = str.substring(0,i) + replaceAll(st2, find, replace);
                    }
                }
                return str;
            }

            return texts;
        }
    }
})
.factory('FinesCalculator', function($cordovaSQLite, Formulas) {
    var calculateExceed =  function(speedLimit, speedDriven){
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
                var exceed = calculateExceed(offense.speed_limit, offense.speed_corrected);
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
                case "Other":
                formulaIds.push(2);
                switch (offense.degree) {

                    case 1:
                    formulaIds.push(11);
                    break;
                    case 2:
                    formulaIds.push(12);
                    break;
                    case 3:
                    formulaIds.push(13);
                    break;
                    case 4:
                    formulaIds.push(14);
                    break;
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
        calculateExceed: calculateExceed
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
            var formulas = [
                calc1(10) + " tot " + calc1(500),
                calc2(25),
                calc3(50, 10, diff),
                calc3(60,10, diff),
                calc3(50,5, diff),
                calc3(60,5, diff),
                calc1(25) + " tot " + calc1(500),
                calc1(200) + " tot " + calc1(2000),
                calc1(400) + " tot " + calc1(5000),
                calc1(800) + " tot " + calc1(10000),
                calc1(10) + " tot " + calc1(250),
                calc1(20) + " tot " + calc1(250),
                calc1(30) + " tot " + calc1(250),
                calc1(40) + " tot " + calc1(250)
                ];
            return formulas[formulaId -1];
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
.factory('TranslateService', function($cordovaSQLite){
    return{
        dutchToEnglish: function(word) {
            var translations = {
                "SNELHEID": "Speed",
                "ALCOHOL": "Alchohol",
                "DRUGS": "Drugs",
                "ANDERE": "Other"
            };
          return translations[word];
      },
      englishToDutch: function(word) {
          var translations = {
              "Speed": "SNELHEID",
              "Alchohol": "ALCOHOL",
              "Drugs": "DRUGS",
              "Other": "ANDERE"
          };
        return translations[word];
      }
    }
})
.factory('ExceptionsService', function($cordovaSQLite, Offenses, FinesCalculator){
    var fines = [];
    var offenses = [];
    return{
        qualifyOI: function() {
            offenses = Offenses.all();
            var finesAmounts = 0;
            var minSum = 0;

            for (var i = 0; i < offenses.length; i++) {
                var offense = offenses[i];
                for (var key in offense) {
                    if (offense.hasOwnProperty(key)) {
                        if(offense.type === "Other"){
                            if(offense.degree === 3 || offense.degree === 4){
                                console.log("Offense degree: " + offense.degree);
                                return false;
                            }
                        }
                    }
                }

                var currSum = 0;
                var fines = FinesCalculator.getFines(offense);
                for (var key in fines) {
                    if (fines.hasOwnProperty(key)) {
                        console.log(key + " -> " + fines[key]);
                        var fineString = fines[key].toString();
                        var fineAmounts = fineString.split(" tot ");
                        currSum +=parseInt(fineAmounts[0]);
                    }
                }
                minSum += currSum;
                console.log("Offense fine: " + currSum);

                if(currSum > 330){
                    if(offense.type != "Alchohol"){
                        console.log("Sum over 330");
                        return false;
                    }
                }
            }
            return true;
      },
      qualifyMS: function(offenses) {
          offenses = Offenses.all();
          var finesAmounts = 0;
          var minSum = 0;

          for (var i = 0; i < offenses.length; i++) {
              var offense = offenses[i];
              var currSum = 0;
              var fines = FinesCalculator.getFines(offense);
              for (var key in fines) {
                  if (fines.hasOwnProperty(key)) {
                      console.log(key + " -> " + fines[key]);
                      var fineString = fines[key].toString();
                      var fineAmounts = fineString.split(" tot ");
                      currSum +=parseInt(fineAmounts[0]);
                  }
              }
              minSum += currSum;
          }
          if(minSum > 1500){
              console.log("Sum over 1550");
              return false;
          }
          return true;
      }
    }
})
