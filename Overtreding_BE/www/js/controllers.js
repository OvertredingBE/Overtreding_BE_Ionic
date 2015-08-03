/**
* Created by MartinDzhonov on 6/1/15.
*/

angular.module('starter.controllers', [])

.controller("ConfigController", function($scope, $ionicPlatform, $ionicLoading, $cordovaSQLite, $http, $ionicPopup, Offenses){
    Offenses.clear();

    $ionicPlatform.ready(function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
        var db = null;
        $scope.items = [];
        var url = 'http://www.martindzhonov.podserver.info/overtreding_api/v1/getDB';
        // var url = 'http://localhost/overtreding_api/v1/getDB';

        $http.get(url).then(function(resp) {
            console.log("Fetching database");
            db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
            db.transaction(function (tx) {
                tx.executeSql("DROP TABLE IF EXISTS Texts");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Texts(id integer primary key, body text)");
                tx.executeSql("DROP TABLE IF EXISTS Rights");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Rights(id integer primary key, type integer, body text)");
                tx.executeSql("DROP TABLE IF EXISTS Alchohol");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Alchohol(id integer primary key, intoxication integer, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
                tx.executeSql("DROP TABLE IF EXISTS Drugs");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Drugs(id integer primary key, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
                tx.executeSql("DROP TABLE IF EXISTS Speed");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Speed(id integer primary key, exceed integer, road integer, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
                tx.executeSql("DROP TABLE IF EXISTS Other");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Other(id integer primary key, degree integer, description text, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
                tx.executeSql("DROP TABLE IF EXISTS Other_Tags");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Other_Tags(tag_name text, offense_id integer)");
            });

            var items = resp.data.texts;
            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                $cordovaSQLite.execute(db, "INSERT INTO Texts (body) VALUES (?)", [textBody]);
            }

            var items = resp.data.rights;
            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                var type = items[i].type;
                $cordovaSQLite.execute(db, "INSERT INTO Rights (type, body) VALUES (?,?)", [type, textBody]);
            }

            var items = resp.data.speed;
            for(var i = 0; i < items.length; i++){
                var exceed = items[i].exceed;
                var road = items[i].road;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Speed (exceed, road, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [exceed, road, text_id_1, text_id_2, text_id_3]);
            }

            var items = resp.data.alcohol;
            for(var i = 0; i < items.length; i++){
                var intoxication = items[i].intoxication;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Alchohol (intoxication, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?)", [intoxication, text_id_1, text_id_2, text_id_3]);
            }

            var items = resp.data.drugs;
            for(var i = 0; i < items.length; i++){
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Drugs (text_id_1,text_id_2,text_id_3) VALUES (?,?,?)", [text_id_1, text_id_2, text_id_3]);
            }

            var items = resp.data.other;
            for(var i = 0; i < items.length; i++){
                var degree = items[i].degree;
                var description = items[i].description;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Other (degree, description, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [degree, description, text_id_1, text_id_2, text_id_3]);
            }

            var items = resp.data.other_tags;
            for(var i = 0; i < items.length; i++){
                var tag_name = items[i].tag_name;
                var offense_id = items[i].offense_id;
                $cordovaSQLite.execute(db, "INSERT INTO Other_Tags (tag_name, offense_id) VALUES (?,?)", [tag_name, offense_id]);
            }
            $scope.succ = resp.statusText;
            $scope.log = items.length;
            $ionicLoading.hide();
            console.log("Database populated.");

        }, function(err) {
            $ionicLoading.hide();
            var confirmPopup = $ionicPopup.confirm({
                title: 'Error',
                template: "Could not connect to server"
            });
            console.error(err);
        });
    });
})

.controller("HomeController", function($scope, $ionicPlatform, $ionicHistory, Offenses){
    Offenses.clear();
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})

.controller("RightsController", function($scope, $ionicHistory, Rights, $http, $ionicPopup, Others2) {
    $scope.items = Rights.alchRights();
    $scope.selected = 1;

    $scope.showAlch = function() {
        $scope.items = [];
        $scope.items = Rights.alchRights();
        $scope.selected = 1;
    };

    $scope.showDrugs = function() {
        $scope.items = [];
        $scope.items = Rights.drugRights();
        $scope.selected = 2;
    };

    $scope.test = function() {
        Others2.searchOthers("bevel").then(function(res){
            for (var i = 0; i < res.length; i++) {
                console.log(res.item(i).description);
            }
        });
        // var url = 'http://localhost/overtreding_api/v1/test';
        // var url = 'http://www.martindzhonov.podserver.info/overtreding_api/v1/test';
        //
        // $http.post(url, { params: { "test": "value1", "test2": "value2" } })
        // .success(function(data) {
        // })
        // .error(function(data) {
        //     alert("ERROR");
        // });
        //
        //
        // $http.post(url,{'test': 'asdf'}).then(function(resp){
        //     $ionicPopup.alert({
        //         title: "Success",
        //         template: resp
        //     });
        //     console.log(resp)
        // },function(err){
        //     $ionicPopup.alert({
        //         title: "Error",
        //         template: err
        //     });
        // });
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})

.controller("ContactController", function($scope, $ionicHistory, $ionicPopup, $http, Offenses, ZipCodes) {
    $scope.form = {};

    $scope.resultTapped = function() {
        var counter = 0;
        for (var key in $scope.form) {
            if ($scope.form.hasOwnProperty(key)) {
                if(key != "comments"){
                    counter++;
                }
            }
        }
        if(counter != 4){
            $ionicPopup.alert({
                title: 'FOUT',
                template: 'Gelieve alle verplichte velden in te vullen (*)'
            });
        }
        else{
            if(validateEmail($scope.form.email)){
                $ionicPopup.alert({
                    title: 'Bedankt voor uw aanvraag.',
                    template: 'We nemen zo snel mogelijk contact met u op.'
                });

                var url = 'http://www.martindzhonov.podserver.info/overtreding_api/v1/email';

                $http.post(url,{test: 'test'}).then(function(resp){console.log(resp)},function(err){console.log(err)});
                //
                // $http.post(url, {msg:'hello word!'}).
                // success(function(data, status, headers, config) {
                //     console.log(data);
                // }).
                // error(function(data, status, headers, config) {
                //     console.log(status);
                // });
            }
            else{
                $ionicPopup.alert({
                    title: 'FOUT',
                    template: 'Gelieve een geldig e-mail adres in te vullen.'
                });
            }
        }

        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }

    $scope.getCity = function(){
        var code = $scope.form.postcode;
        var asd = ZipCodes.getNameForZipCode(code);
        $scope.form.postcode = asd;
    }
})

.controller("CalcFineController", function($scope, $ionicHistory, $ionicPopup, $location, Offenses, Questions, TranslateService, Formulas, Others2) {
    $scope.offenses = [];
    $scope.searchResults = [];
    $scope.inputs = {};
    $scope.menu = Questions.getQuestions("Menu");
    var indexShown = 0;
    var offense = null;
    addDummyOffense();
    resetFields();
    $scope.menuShown = true;

    $scope.menuSubgroupTapped = function(menuItem){
        var type = TranslateService.dutchToEnglish(menuItem);
        offense = Offenses.createDefault(type);
        $scope.offenses.splice($scope.offenses.length -1, 1, offense);

        $scope.questions = Questions.getQuestions(type);
        $scope.toggleBorder($scope.questions[0]);
        $scope.menuShown = false;
        $scope.questionsShown = true;

        if(type === "Speed"){
            $scope.showInput = true;
        }
        else{
            $scope.toggleBorder($scope.questions[$scope.questions.length - 1]);
        }

        if(type === "Other"){
            $scope.questionsShown = false;
            $scope.showSearch = true;
            $scope.searchMessage = "Vul hierboven een trefwoord of artikelnummer in en zoek uw overtreding. Voeg een komma toe om te zoeken door middel van meerdere trefwoorden.";
        }
    };

    $scope.subgroupTapped = function(item, group, index) {
        $scope.questions[group.id].name =  item;
        var fieldName = Offenses.getFieldName(group.id, offense["type"]);
        console.log(fieldName + " - " + index);
        offense[fieldName] = index;
        if(offense.type === "Speed"){
            if(offense.road === 0){
                $scope.questions[3].items = ["10", "20", "30", "40", "50"];
            }
        }
        if(offense.type === "Alchohol"){
            if(offense.driver == 0){
                $scope.questions[3].items.unshift("0,20 - 0,50 PROMILLE");
            }
            else{
                offense["intoxication"] = index + 1;
            }
        }
    };

    $scope.toggleBorder = function(group){
        group.toggled = !group.toggled;
    }

    $scope.groupShown = function(groupIndex){
        if(groupIndex === indexShown){
            return 1;
        }
        else{
            return 0;
        }
    }
    $scope.changeShownGroup = function(groupIndex) {
        indexShown++;

        if(indexShown === $scope.questions.length){
            $scope.toggleBorder($scope.questions[indexShown-1]);
            indexShown = -1;
        }
        else {
            if(indexShown != $scope.questions.length-1){
                $scope.toggleBorder($scope.questions[indexShown]);
            }
        }
    };

    $scope.createNewOffense = function(){
        if(addCurrOffense()){
            addDummyOffense();
            resetFields();
            $scope.menuShown = true;
        }
        else{
            $ionicPopup.alert({
                title: 'INFORMATIE',
                template: 'Gelieve alle velden van een antwoord te voorzien'
            });
        }
    };

    $scope.removeOffense = function(index){
        var confirmPopup = $ionicPopup.confirm({
            title: 'INFORMATIE',
            template: 'Bent u zeker dat u deze overtreding wil verwijderen ?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                if(index === $scope.offenses.length -1){
                    offense = {type: ""};
                    $scope.offenses.splice($scope.offenses.length -1, 1, offense);
                    resetFields();
                    $scope.menuShown = true;
                }
                else{
                    $scope.offenses.splice(index, 1);
                    Offenses.remove(index);
                }            } else {
                    console.log('You are not sure');
                }
        });
    };

    $scope.resultTapped = function() {
        var offenses = Offenses.all();
        if(addCurrOffense()){
            {
                addDummyOffense();
                resetFields();
                $scope.menuShown = true;
                if(offenses.length === 1){
                    $location.path("/result/0");
                }
                else{
                    $location.path("/result");
                }
            }
        }
        else{
            $ionicPopup.alert({
                title: 'INFORMATIE',
                template: 'Gelieve alle velden van een antwoord te voorzien'
            });
        }
    }

    $scope.calcSpeed = function() {
        var input = $scope.inputs.speed_driven;
        var valid = true;

        if(isNaN(input)){
            valid = false;
        }
        else{
            var speedDriven = parseInt(input);
            var speedCorrected = Formulas.getCorrectedSpeed(speedDriven);
            var speedLimit = (offense.speed_limit+1) * 10;

            if(speedCorrected < 10 || speedDriven < 10){
                valid = false;
            }
            else if(speedCorrected <= speedLimit){
                valid = false;
                $ionicPopup.alert({
                    title: 'INFORMATIE',
                    template: 'De gecorrigeerde snelheid kan niet lager zijn dan snelheidslimiet". Gelieve opnieuw te proberen.'
                });
            }
            if(valid){
                $scope.inputs.speed_corrected = speedCorrected;
            }
        }
        console.log(valid);
        if(valid){
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_driven);
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_corrected);
        }
        else{
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = -1;
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = -1
            $scope.inputs.speed_corrected = "";
        }
    };

    $scope.calcSpeed2 = function() {
        var input = $scope.inputs.speed_corrected;
        var valid = true;

        if(isNaN(input)){
            valid = false;
        }
        else{
            var speedCorrected = parseInt(input);
            var speedDriven = Formulas.getDrivenSpeed(speedCorrected);
            var speedLimit = (offense.speed_limit+1) * 10;
            if(speedCorrected < 10){
                valid = false;
            }
            else if(speedCorrected <= speedLimit){
                valid = false;
                $ionicPopup.alert({
                    title: 'INFORMATIE',
                    template: 'De gecorrigeerde snelheid kan niet lager zijn dan snelheidslimiet". Gelieve opnieuw te proberen.'
                });
            }
            if(valid){
                $scope.inputs.speed_driven = speedDriven;
            }
        }
        console.log(valid);
        if(valid){
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_driven);
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_corrected);
        }
        else{
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = -1;
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = -1
            $scope.inputs.speed_driven = "";
        }
    };

    $scope.search = function() {
        $scope.spinnerShown = true;
        $scope.searchResults.length = 0;
        $scope.questionsShown = false;
        var searchWords = $scope.inputs.searchWord;
        searchWords = searchWords.toLowerCase();
        var searchArr = searchWords.split(',');
        // $scope.searchResults = Others.searchOthers(searchArr);
        Others2.searchOthers(searchArr[0]).then(function(res){
            $scope.spinnerShown = false;
            for (var i = 0; i < res.length; i++) {
                $scope.searchResults.push({
                    id: res.item(i).id,
                    degree: res.item(i).degree,
                    description: res.item(i).description});
            }
            if(res.length === 0){
                $scope.spinnerShown = true;

                $scope.searchMessage = "Er is geen resultaat voor uw zoekopdracht. Gelieve opnieuw te proberen met andere trefwoorden";
            }
        });
    };

    $scope.otherTapped = function(item) {
        $scope.searchResults.length = 0;
        $scope.searchResults.push(item);
        offense.id = item.id;
        offense.degree = item.degree;
        $scope.questionsShown = true;
    };

    $scope.goBack = function() {
        Offenses.clear();
        $ionicHistory.goBack();
    };

    function addDummyOffense(){
        offense = {type: ""};
        $scope.offenses.push(offense);
    }

    function addCurrOffense(){
        var valid = Offenses.validateOffense(offense) && offense.type != "";
        if(valid){
            Offenses.add(offense);
            return true;
        }
        return false;
    }

    function resetFields(){
        indexShown = 0;
        $scope.showSearch = false;
        $scope.showInput = false;
        $scope.spinnerShown = false;
        $scope.questionsShown = false;
        $scope.searchResults.length = 0;
        $scope.inputs.speed_driven = "";
        $scope.inputs.speed_corrected = "";
        $scope.inputs.searchWord = "";
    }
})

.controller("ResultController", function($scope, $ionicHistory, $ionicPopup, $location, Offenses, ExceptionsService, FinesCalculator, Texts2, ExceptionTexts) {
    var offenses = Offenses.all();
    $scope.offenses = offenses;

    var qualifyOI = ExceptionsService.qualifyOI();
    var qualifyMS = ExceptionsService.qualifyMS();

    for (var i = 0; i < offenses.length; i++) {
        var offense  = offenses[i];
        var texts = [];
        Texts2.getTexts(offense).then(function(res){
            for (var i = 0; i < res.length; i++) {
                console.log(res.item(i).body);
                texts.push(res.item(i).body);
            }
            ExceptionTexts.getExceptionTexts().then(function(res2){
                for (var i = 0; i < res2.length; i++) {
                    if(texts[1] === res2.item(i).body){
                        console.log("Exception found");
                        qualifyMS = false;
                    }
                }
            });
        });
    }

    if(qualifyOI && qualifyMS){
        $scope.message = "Maak uw keuze uit de onderstaande samengestelde overtredingen en ontdek welke gevolgen elke overtreding met zich meebrengt.\n Wenst u graag meer informatie over deze overtredingen, aarzel niet en vraag GRATIS juridisch advies aan via onderstaande button.";
    }
    if(!qualifyMS){
        $scope.message = "De door u samengestelde overtredingen zorgen ervoor dat u niet in aanmerking komt voor een onmiddellijke inning of minnnelijke schikking. U zal sowieso voor de rechtbank moeten verschijnen.\nMaak uw keuze uit de onderstaande samengestelde overtredingen en ontdek welke gevolgen elke overtreding met zih meebrengt.\nWelt u graag meer informatie over deze overtrendigen aarzel niet en vraag GRATIS juridisch advies aan via onderstaande button.";
    }
    if(!qualifyOI) {
        if(qualifyMS){
            $scope.message = "De door u samengestelde overtredingen zorgen ervoor dat u niet in aanmerking komt voor een onmiddellijke inning. U komt wel in aanmerking voor een minnelijke schikking.\nMaak uw keuze uit de onderstaande samengestelde overtredingen en ontdek welke gevolgen elke overtreding met zich meebrengt.\nWilt u meer informatie over de gevolgen die zich kunnen voordoen als u voor de rechtbank moet verschijnen, aarzel niet en vraag GRATIS juridisch advies aan via onderstaande button.";
        }
    }

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
})

.controller("ResultDetailController", function($scope, $ionicHistory, $stateParams, $ionicPopup, Offenses, FinesCalculator, Texts2, Exceptions) {
    $scope.items = [];
    var titles = ["ONMIDDELLIJKE INNING", "MINNELIJKE SCHIKKING", "BEVEL TOT BETALING/RECHTBANK"];
    $scope.titles = titles;
    var texts = [];
    var offense = Offenses.findById($stateParams.offenseId);
    var offenseDisplayId = parseInt($stateParams.offenseId) + 1;
    var fines = FinesCalculator.getFines(offense);
    Texts2.getTexts(offense).then(function(res){
        for (var i = 0; i < res.length; i++) {
            texts.push(replaceFines(res.item(i).body, fines));
            // console.log("\n" + "ID: " + res.item(i).id + "\n" + res.item(i).body);
        }
        Exceptions.evaluateConditionals(texts, offense);
        Exceptions.evaluateExceptions(texts);
    });
    $scope.offenseId = offenseDisplayId;
    $scope.offenseType = offense.type;

    // texts[0] = "asdasda";
    $scope.items = texts;
    // $scope.items = ResultTexts.getTexts(offense);

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
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})

.controller("TakePictureController", function($scope, Camera, $ionicPopup, $ionicHistory, $location) {
    $scope.src = "";
    var confirmPopup = $ionicPopup.alert({
        title: 'INFORMATIE',
        template:  "Gelieve een foto te nemen van de brief die u ontving en deze door te sturen via de button vraag GRATIS juridisch advies.\n Wij bekijken dan wat wij voor u kunnen doen en nemen contact met u op. Alvast bedankt!"
    });
    confirmPopup.then(function(res) {
        if(res) {
            Camera.getPicture().then(function(imageURI) {
                $scope.src = imageURI;
                console.log(imageURI);
            }, function(err) {
                console.log(err);
            });
        } else {
            console.log('You are not sure');
        }
    });
    $scope.goToContact = function(){
        if($scope.src === ""){
            var confirmPopup = $ionicPopup.alert({
                title: 'INFORMATIE',
                template:  "Gelieve een foto te nemen van de brief die u ontving en deze door te sturen via de button vraag GRATIS juridisch advies.\n Wij bekijken dan wat wij voor u kunnen doen en nemen contact met u op. Alvast bedankt!"
            });
            confirmPopup.then(function(res) {
                if(res) {
                    Camera.getPicture().then(function(imageURI) {
                        $scope.src = imageURI;
                        console.log(imageURI);
                    }, function(err) {
                        console.log(err);
                    });
                } else {
                    console.log('You are not sure');
                }
            });
        }
        else{
            $location.path("/contact");
        }
        console.log($scope.src);
    }
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
});
