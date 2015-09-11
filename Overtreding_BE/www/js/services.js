/**
* Created by MartinDzhonov on 6/1/15.
*/
angular.module('starter.services', [])
.factory('Rights', function($cordovaSQLite, FinesCalculator, Formulas){
    var arr = [];
    return {
        getRights: function(type){
            var query = "SELECT * FROM Rights WHERE type=?";
            return $cordovaSQLite.execute(db, query, [type]).then(function(res){
                arr = res.rows;
                return arr;
            }, function(err){
                console.error(err);
            });
        },
    }
})
.factory('Texts', function($cordovaSQLite, FinesCalculator, Formulas){
    var arr = [];
    return {
        getRights: function(type){
            var query = "SELECT * FROM Rights WHERE type=?";
            return $cordovaSQLite.execute(db, query, [type]).then(function(res){
                arr = res.rows;
                return arr;
            }, function(err){
                console.error(err);
            });
        },
        getTexts: function(offense) {
            switch (offense.type) {
                case "Speed":
                var query = "SELECT a.id, a.body FROM Texts a INNER JOIN Speed b ON a.id=b.text_id_1 OR a.id=b.text_id_2 OR a.id=b.text_id_3 WHERE b.exceed = ? AND b.road = ? ORDER BY CASE WHEN a.id=b.text_id_1 THEN 1 WHEN a.id=b.text_id_2 THEN 2 ELSE 3 END";
                var exceed = Formulas.calculateExceed(offense.speed_limit, offense.speed_corrected);
                console.log("Exceed: " + exceed);
                return $cordovaSQLite.execute(db, query, [exceed, offense.road]).then(function(res){
                    arr = res.rows;
                    return arr;
                }, function(err){
                    console.error(err);
                });
                break;
                case "Alchohol":
                var query = "SELECT a.id, a.body FROM Texts a INNER JOIN Alchohol b ON a.id=b.text_id_1 OR a.id=b.text_id_2 OR a.id=b.text_id_3 WHERE b.intoxication=? ORDER BY CASE WHEN a.id=b.text_id_1 THEN 1 WHEN a.id=b.text_id_2 THEN 2 ELSE 3 END";
                return $cordovaSQLite.execute(db, query, [offense.intoxication]).then(function(res){
                    arr = res.rows;
                    return arr;
                }, function(err){
                    console.error(err);
                });
                break;
                case "Drugs":
                var query = "SELECT a.id, a.body FROM Texts a INNER JOIN Drugs b ON a.id=b.text_id_1 OR a.id=b.text_id_2 OR a.id=b.text_id_3 ORDER BY CASE WHEN a.id=b.text_id_1 THEN 1 WHEN a.id=b.text_id_2 THEN 2 ELSE 3 END";
                return $cordovaSQLite.execute(db, query, []).then(function(res){
                    arr = res.rows;
                    return arr;
                }, function(err){
                    console.error(err);
                });
                break;
                case "Other":
                var query = "SELECT a.id, a.body FROM Texts a INNER JOIN Other b ON a.id=b.text_id_1 OR a.id=b.text_id_2 OR a.id=b.text_id_3 WHERE b.id = ? ORDER BY CASE WHEN a.id=b.text_id_1 THEN 1 WHEN a.id=b.text_id_2 THEN 2 ELSE 3 END";
                return $cordovaSQLite.execute(db, query, [offense.id]).then(function(res){
                    arr = res.rows;
                    return arr;
                }, function(err){
                    console.error(err);
                });
                break;
            }
        }
    }
})
.factory('CombinedFines', function($cordovaSQLite, Offenses, FinesCalculator,Formulas){
    var fines = [];
    var offenses = [];
    var texts = [];
    return{
        qualifyOI: function() {
            offenses = Offenses.all();
            var finesAmounts = 0;
            var minSum = 0;
            console.log("----------QUALIFY OI------------")

            for (var i = 0; i < offenses.length; i++) {
                var offense = offenses[i];
                for (var key in offense) {
                    if (offense.hasOwnProperty(key)) {
                        if(offense.type === "Other"){
                            if(offense.degree === 3 || offense.degree === 4){
                                console.log("QUALIFY OI: FALSE");
                                console.log("Offense degree:" + offense.degree);
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
      },
      qualifyMS: function() {
          offenses = Offenses.all();
          var finesAmounts = 0;
          var minSum = 0;
          console.log("----------QUALIFY OI------------")

          for (var i = 0; i < offenses.length; i++) {
              var offense = offenses[i];
              if(offense.licence === 0){
                  switch (offense.type) {
                      case "Speed":
                      var exceed = Formulas.calculateExceed(offense.speed_limit, offense.speed_corrected);
                      if(exceed >= 2){
                         return false;
                      }
                      break;
                      case "Alchohol":
                      if(offense.intoxication <= 5){
                         return false;
                      }
                      break;
                      case "Other":
                      if(offense.degree === 3 || offense.degree === 4){
                          return false;
                      }
                      default:
                  }
              }
          }
          return true;
      }
    }
})

.factory('OffenseEvaluator', function($cordovaSQLite, Offenses, FinesCalculator, CombinedFines, ExceptionTexts, Formulas){
    var offenses = [];
    return{
        evaluateOffense: function(texts, offense) {
            for (var key in offense) {
                if (offense.hasOwnProperty(key)) {
                    console.log(key + " -> " + offense[key]);
                }
            }
            if(offense.licence === 0){
                switch (offense.type) {
                    case "Speed":
                    var exceed = Formulas.calculateExceed(offense.speed_limit, offense.speed_corrected);
                    if(exceed >= 2){
                        texts[0] = "U komt niet in aanmerking voor een onmiddellijke inning.";
                        texts[1] = "U komt niet in aanmerking voor een minnelijke schikking.";
                        texts[2] = "Heeft u uw rijbewijs minder dan 2 jaar op het ogenblik van de overtreding, dan kan uw rijbewijs onmiddellijk worden ingetrokken. U komt niet in aanmerking voor een onmiddellijke inning of minnelijke schikking. In principe wordt u sowieso gedagvaard voor de politierechtbank. Bovendien is de rechter verplicht u een rijverbod van minstens 8 dagen op te leggen. Bovendien dient u te kiezen of u uw praktisch of uw theoretisch examen opnieuw wenst af te leggen.";
                    }
                    break;
                    case "Alchohol":
                    if(offense.intoxication <= 5){
                        texts[0] = "U komt niet in aanmerking voor een onmiddellijke inning.";
                        texts[1] = "U komt niet in aanmerking voor een minnelijke schikking.";
                        texts[2] = "Heeft u uw rijbewijs minder dan 2 jaar op het ogenblik van de overtreding, dan kan uw rijbewijs onmiddellijk worden ingetrokken. U komt niet in aanmerking voor een onmiddellijke inning of minnelijke schikking. In principe wordt u sowieso gedagvaard voor de politierechtbank. Bovendien is de rechter verplicht u een rijverbod van minstens 8 dagen op te leggen. Bovendien dient u te kiezen of u uw praktisch of uw theoretisch examen opnieuw wenst af te leggen.";
                    }
                    break;
                    case "Other":
                    if(offense.degree === 3 || offense.degree === 4){
                        texts[0] = "U komt niet in aanmerking voor een onmiddellijke inning.";
                        texts[1] = "U komt niet in aanmerking voor een minnelijke schikking.";
                        texts[2] = "Heeft u uw rijbewijs minder dan 2 jaar op het ogenblik van de overtreding, dan kan uw rijbewijs onmiddellijk worden ingetrokken. U komt niet in aanmerking voor een onmiddellijke inning of minnelijke schikking. In principe wordt u sowieso gedagvaard voor de politierechtbank. Bovendien is de rechter verplicht u een rijverbod van minstens 8 dagen op te leggen. Bovendien dient u te kiezen of u uw praktisch of uw theoretisch examen opnieuw wenst af te leggen.";
                    }
                    default:
                }
            }
        },
        evaluateCombined: function(texts){
            // var qualifyOI = CombinedFines.qualifyOI();
            // console.log("Qualify OI: " + qualifyOI);
            // if(!qualifyOI){
            //     texts[0] = "U komt niet in aanmerking voor een onmiddellijke inning.";
            // }
            // var qualifyMS = CombinedFines.qualifyMS();
            // console.log("Qualify MS: " + qualifyMS);
            // if(!qualifyMS){
            //     texts[0] = "U komt niet in aanmerking voor een onmiddellijke inning.";
            //     texts[1] = "U komt niet in aanmerking voor een minnelijke schikking.";
            // }
        }
    }
})
.factory('FinesCalculator', function($cordovaSQLite, Formulas) {
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
                var exceed = Formulas.calculateExceed(offense.speed_limit, offense.speed_corrected);
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
                // var formulas = [
                //    0 calc1(10) + " tot " + calc1(500),
                //    1 calc2(25),
                //    2 calc3(50, 10, diff),
                //    3 calc3(60,10, diff),
                //    4 calc3(50,5, diff),
                //    5 calc3(60,5, diff),
                //    6 calc1(25) + " tot " + calc1(500),
                //    7 calc1(200) + " tot " + calc1(2000),
                //    8 calc1(400) + " tot " + calc1(5000),
                //    9 calc1(800) + " tot " + calc1(10000),
                //    10 calc1(10) + " tot " + calc1(250),
                //    11 calc1(20) + " tot " + calc1(250),
                //    12 calc1(30) + " tot " + calc1(250),
                //    13 calc1(40) + " tot " + calc1(250),
                //    14 calc1(100) + " tot " + calc1(1000),
                //    15 calc1(200) + " tot " + calc1(4000),
                //    16 calc1(10) + " tot " + calc1(10000),
                //    17 calc1(100) + " tot " + calc1(1500),
                //    18 calc1(500) + " tot " + calc1(500),
                //     ];
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
                    case 5:
                    formulaIds.push(15);
                    break;
                    case 6:
                    formulaIds.push(16);
                    break;
                    case 7:
                    formulaIds.push(17);
                    break;
                    case 8:
                    formulaIds.push(17);
                    break;
                    case 9:
                    formulaIds.push(17);
                    break;
                    case 10:
                    formulaIds.push(18);
                    break;
                    case 11:
                    formulaIds.push(11);
                    break;
                    case 12:
                    formulaIds.push(8);
                    break;
                    case 13:
                    formulaIds.push(9);
                    break;
                    case 14:
                    formulaIds.push(8);
                    break;
                    case 15:
                    formulaIds.push(19);
                    break;
                    case 16:
                    formulaIds.push(8);
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
        getFinesForText: function(text){
            var index = text.indexOf("EUR");
            if(index === -1){
                return 0;
            }
            else{
                var end = 0;
                var beggining = 0;
                for (var i = index; i >= 0; i--) {
                    if(text[i] === " "){
                        if(end === 0){
                        end = i;
                        }
                        else{
                            beggining = i;
                            return parseInt(text.substr(beggining+1, end-beggining));
                        }
                    }
                }
            }
        }
    }
})
.factory('Formulas', function($cordovaSQLite){
    return{
        getResultForFormula: function(formulaId, offense){
            var diff = -1;
            if(offense["type"] === "Speed"){
                speedLimit = (offense.speed_limit+1)*10;
                diff = offense.speed_corrected - speedLimit-10;
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
                calc1(40) + " tot " + calc1(250),
                calc1(100) + " tot " + calc1(1000),
                calc1(200) + " tot " + calc1(4000),
                calc1(10) + " tot " + calc1(10000),
                calc1(100) + " tot " + calc1(1500),
                calc1(500) + " tot " + calc1(500),
                ];
            return formulas[formulaId -1];
        },
        getCorrectedSpeed: function(speedDriven){
                if(speedDriven <= 100){
                    return speedDriven - 6;
                }
                else{
                    return Math.floor(speedDriven - 0.06*speedDriven);
                }
        },
        getDrivenSpeed: function(speedCorrected){
            if(speedCorrected <= 100){
                return speedCorrected + 6;
            }
            else{
                return Math.ceil(speedCorrected + 0.064*speedCorrected);
            }
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
            if(difference >= 1){
                return 0;
            }
            return - 1;
        }
    }
    function calc1(y){
        return y*6;
    };
    function calc2(y){
        return y*6;
    };
    function calc3(y,x,z){
        return y + (x * z);
    };
})

.factory('ContactService', function($cordovaSQLite){
    var functionalityType = "";
    var imageData = "";
    return{
        setFunctionality: function(functionality){
            functionalityType = functionality;
        },
        getFunctionality: function(){
            return functionalityType;
        },
        setImageData: function(data){
            imageData = data;
        },
        getImageData: function(){
            return imageData;
        }
    }
})
.factory('Offenses', function($cordovaSQLite, TranslateService) {
    var offenses = [];

    return {
        all: function() {
            return offenses;
        },
        parsed: function(){
            var offenses2 = [];
            for (var i = 0; i < offenses.length; i++) {
                var offense = offenses[i];
                offenses2.push(TranslateService.parseOffense(offense));
            }
            return offenses2;
        },
        add: function(offense) {
            offenses.push(offense);
        },
        remove: function(index){
            offenses.splice(index, 1);
        },
        clear: function(){
            console.log("Clearing Offenses");
            offenses = [];
        },
        findById: function(offenseId){
            return offenses[offenseId];
        },
        replaceAtIndex: function(offense, index){
            offenses[index] = offense;
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
.factory('Test', function($cordovaSQLite){
    var arr = [];
    return{
        getAlchohol:function(){
            var query = "SELECT * FROM n";
            return $cordovaSQLite.execute(db, query, []).then(function(res){
                arr = res.rows;
                return arr;
            }, function(err){
                console.error(err);
            });
        }
    }
})
.factory('Others2', function($cordovaSQLite) {
    var arr = [];
    return {
        searchOthers: function(tag){
            var query = "SELECT DISTINCT a.id, a.description, a.degree FROM Other a INNER JOIN Other_Tags b ON a.id = b.offense_id WHERE";
            for (var i = 0; i < tag.length; i++) {
                if(tag[i] != ""){
                    if(i === 0){
                        query = query + " b.tag_name LIKE "+ "'%" + tag[i] + "%'";
                    }
                    else{
                        query = query + " OR b.tag_name LIKE "+ "'%" + tag[i] + "%'";
                    }
                }
            }
            console.log(query);
            return $cordovaSQLite.execute(db, query, []).then(function(res){
                arr = res.rows;
                return arr;
            }, function(err){
                console.error(err);
            });
        },
        getAllTags:function(){
            var query = "SELECT * FROM Other_Tags";
            return $cordovaSQLite.execute(db, query, []).then(function(res){
                arr = res.rows;
                return arr;
            }, function(err){
                console.error(err);
            });
        }
    }
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
                "Other": "ANDERE",
                "Rights": "Uw rechten bij een politiecontrole",
                "CalcFine": "Boete berekenen",
                "TakePicture": "U ontving een brief",
                "licence": "RIJBEWIJS",
                "age": "LEEFTIJD",
                "road": "TYPE RIJBAAN",
                "speed_limit": "SNELHEIDSLIMIET",
                "driver": "BESTUURDER",
                "intoxication": "INTOXICATIE",
                "blood_test": "TYPE OVERTREDING",
                "menu": "KIES UW TYPE OVERTREDING"
            };
            return translations[word];
        },
        parseOffense: function(offense){
            var strArr = [];
            var self = this;
            strArr.push(self.englishToDutch(offense.type));
            for (var key in offense) {
                if (offense.hasOwnProperty(key)) {
                    if(key === "licence"){
                        var arr = ["IK HEB MIJN RIJBEWIJS MINDER DAN 2 JAAR", "IK HEB MIJN RIJBEWIJS LANGER DAN 2 JAAR"];
                        strArr.push(arr[offense[key]]);
                    }
                    if(key === "age"){
                        var arr = ["JONGER DAN 18 JAAR","18 JAAR OF OUDER"];
                        strArr.push(arr[offense[key]]);
                    }
                    if(key === "road"){
                        var arr = ["WOONERF, ZONE 30, SCHOOL, BEBOUWDE KOM", "ANDERE WEGEN"];
                        strArr.push(arr[offense[key]]);
                    }
                    if(key === "speed_limit"){
                        strArr.push("Snelheidslimiet: " + (offense[key]+1)*10);
                    }
                    if(key === "speed_driven"){
                        strArr.push("Gereden snelheid: " + offense[key]);
                    }
                    if(key === "speed_corrected"){
                        strArr.push("Gecorrigeerde snelheid: " + offense[key]);
                    }
                    if(key === "driver"){
                        var arr = ["PROFESSIONELE BESTUURDER", "GEWONE BESTUURDER"]
                        strArr.push(arr[offense[key]]);
                    }
                    if(key === "intoxication"){
                        var arr = ["0,50 – 0,80 PROMILLE",
                        "0,80 – 1,00 PROMILLE",
                        "1,00 – 1,14 PROMILLE",
                        "1,14 – 1,48 PROMILLE",
                        "1,48 - ... PROMILLE",
                        "WEIGERING ADEMTEST OF ANALYSE ZONDER WETTIGE REDEN",
                        "DRONKENSCHAP",
                        "EERDER BETRAPT OP ALCOHOLINTOXICATIE VAN MEER DAN 0,8 PROMILLE OF DRONKENSCHAP EN NU OPNIEUW BETRAPT OP ALCOHOLINTOXICATIE VAN MEERDAN 0,8 PROMILLE.",
                        "EERDER BETRAPT OP ALCOHOLINTOXICATIE VAN MEER DAN 0,8 PROMILLE OF DRONKENSCHAP EN NU OPNIEUW BETRAPT OP DRONKENSCHAP"];
                        strArr.push(arr[offense[key]]);
                    }
                    if(key === "blood_test"){
                        var arr = ["U WORDT POSITIEF BEVONDEN OP DE AANWEZIGHEID VAN DRUGS IN UW BLOED", "U WEIGERT ZONDER WETTIGE REDEN DE SPEEKSELTEST OF ANALYSE"];
                        strArr.push(arr[offense[key]]);
                    }
                    if(key === "description"){
                        strArr.push(offense[key]);
                    }
                    if(key === "degree"){
                        strArr.push(offense[key]);
                    }
                }
            }
            return strArr;
        }
    }
})
.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
        options = {
            quality:50,
            targetWidth: 1000,
            targetHeight:1400,
    saveToPhotoAlbum: false,
    destinationType: Camera.DestinationType.DATA_URL
};
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
.factory('Questions', function($cordovaSQLite, TranslateService) {
    var asdf = function(fieldName){
        switch (fieldName) {
            case "menu":
                return ["SNELHEID", "ALCOHOL", "DRUGS", "ANDERE"];
            case "licence":
                return ["IK HEB MIJN RIJBEWIJS MINDER DAN 2 JAAR", "IK HEB MIJN RIJBEWIJS LANGER DAN 2 JAAR"];
            break;
            case "age":
                return ["JONGER DAN 18 JAAR","18 JAAR OF OUDER"];
            break;
            case "road":
                return ["WOONERF, ZONE 30, SCHOOL, BEBOUWDE KOM", "ANDERE WEGEN"];
            break;
            case "speed_limit":
                return ["10","20","30","40","50","60","70","80","90","100","110","120"];
            break;
            case "driver":
                return ["PROFESSIONELE BESTUURDER", "GEWONE BESTUURDER"];
            break;
            case "intoxication":
                return ["0,50 – 0,80 PROMILLE / 0,22 - 0,35 mg/I UAL",
                "0,80 – 1,00 PROMILLE / 0,35 - 0,44 mg/I UAL",
                "1,00 – 1,14 PROMILLE / 0,44 - 0,50 mg/I UAL",
                "1,14 – 1,48 PROMILLE / 0,50 - 0, 65 mg/I UAL",
                "1,48 - ... PROMILLE/ 0,65 mg mg/I UAL - ...",
                "WEIGERING ADEMTEST OF ANALYSE ZONDER WETTIGE REDEN",
                "DRONKENSCHAP",
                "EERDER BETRAPT OP ALCOHOLINTOXICATIE VAN MEER DAN 0,8 PROMILLE OF DRONKENSCHAP EN NU OPNIEUW BETRAPT OP ALCOHOLINTOXICATIE VAN MEERDAN 0,8 PROMILLE.",
                "EERDER BETRAPT OP ALCOHOLINTOXICATIE VAN MEER DAN 0,8 PROMILLE OF DRONKENSCHAP EN NU OPNIEUW BETRAPT OP DRONKENSCHAP"];
            break;
            case "blood_test":
                return ["U WORDT POSITIEF BEVONDEN OP DE AANWEZIGHEID VAN DRUGS IN UW BLOED", "U WEIGERT ZONDER WETTIGE REDEN DE SPEEKSELTEST OF ANALYSE"];
            break;
            default:

        }
    }
    return {
        getQuestionsForField: asdf,
        getQuestions: function(name) {
            var names = [];
            var groups = [];
            var subgroups = [];
            switch (name) {
                case "Menu":
                names = ["menu"];
                break;
                case "Speed":
                names = ["licence","age","road","speed_limit"];
                break;
                case "Alchohol":
                names = ["licence", "age", "driver", "intoxication"];
                break;
                case "Drugs":
                names = ["licence", "age", "blood_test"];
                break;
                case "Other":
                names = ["licence","age"];
                break;
                default:
            }
            for (var k = 0; k < names.length; k++) {
                var questionsArr = asdf(names[k]);
                subgroups.push(questionsArr);
            }

            for (var i=0; i<names.length; i++) {
                groups[i] = {
                    id: i,
                    name: TranslateService.englishToDutch(names[i]),
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
.factory('ExceptionTexts', function($cordovaSQLite){
    var arr = [];
    return{
        getExceptionTexts: function(){
            var query = "SELECT * FROM Texts WHERE id = 11 OR id = 15 OR id = 30 OR id = 31 OR id = 51 OR id = 59 OR id = 65";
            return  $cordovaSQLite.execute(db, query, []).then(function(res){
                arr = res.rows;
                return arr;
            }, function(err){
                console.error(err);
            });
        }
    }
})
.factory('Utils', function(){
    return{
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
        validateEmail: function(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        },
        replaceFines: function (str, fines){
            var asd = str;
            for (var key in fines) {
                console.log(key + " -> " + fines[key]);
                if (fines.hasOwnProperty(key)) {
                    asd = replaceAll(asd, key, fines[key] + " EUR");
                }
            }
            return asd;
        },
        encodeImageUri: function(imageUri)
        {
            var c=document.createElement('canvas');
            var ctx=c.getContext("2d");
            var img=new Image();
            img.onload = function(){
                c.width=this.width;
                c.height=this.height;
                ctx.drawImage(img, 0,0);
            };
            img.src=imageUri;
            var dataURL = c.toDataURL("image/jpeg");
            return dataURL;
        },
        getNameForZipCode: function(code) {
            for (var i = 0; i < zipcodes.length; i++) {
                if(zipcodes[i]["zip"] === code){
                    return zipcodes[i]["city"] + " - " + code;
                }
            }
            return code;
        },
        multiSplit: function(str,delimeters){
            var result = [str];
            if (typeof(delimeters) == 'string')
            delimeters = [delimeters];
            while(delimeters.length>0){
                for(var i = 0;i<result.length;i++){
                    var tempSplit = result[i].split(delimeters[0]);
                    result = result.slice(0,i).concat(tempSplit).concat(result.slice(i+1));
                }
                delimeters.shift();
            }
            for (var i = 0; i < result.length; i++) {
                if(result[i] === "" || result[i] === " "){
                    result.splice(i, 1);
                }
            }
            return result;
        }
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
})
.factory('SecuredPopups', [
        '$ionicPopup',
        '$q',
        function ($ionicPopup, $q) {

            var firstDeferred = $q.defer();
            firstDeferred.resolve();

            var lastPopupPromise = firstDeferred.promise;

            return {
                'show': function (method, object) {
                    var deferred = $q.defer();

                    lastPopupPromise.then(function () {
                        $ionicPopup[method](object).then(function (res) {
                            deferred.resolve(res);
                        });
                    });

                    lastPopupPromise = deferred.promise;

                    return deferred.promise;
                }
            };
        }
    ])
