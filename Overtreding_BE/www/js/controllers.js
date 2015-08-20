/**
* Created by MartinDzhonov on 6/1/15.
*/
angular.module('starter.controllers', [])
.controller("HomeController", function($scope, $cordovaSQLite, $cordovaSplashscreen, $ionicPlatform, $ionicPopup, Offenses, FinesCalculator, Texts){

    $scope.calcFineTapped = function(){
        Offenses.clear();
    }
    ionic.Platform.ready(function(){
        var flag = false;
        var db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
        db.transaction(function (tx) {
            console.log("Creating Database");
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

            console.log("Populating Database");

            var items = dbJson.texts;
            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                $cordovaSQLite.execute(db, "INSERT INTO Texts (body) VALUES (?)", [textBody]);
            }
            var items = dbJson.rights;
            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                var type = items[i].type;
                $cordovaSQLite.execute(db, "INSERT INTO Rights (type, body) VALUES (?,?)", [type, textBody]);
            }

            var items = dbJson.speed;
            for(var i = 0; i < items.length; i++){
                var exceed = items[i].exceed;
                var road = items[i].road;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Speed (exceed, road, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [exceed, road, text_id_1, text_id_2, text_id_3]);
            }

            var items = dbJson.alcohol;
            for(var i = 0; i < items.length; i++){
                var intoxication = items[i].intoxication;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Alchohol (intoxication, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?)", [intoxication, text_id_1, text_id_2, text_id_3]);
            }

            var items = dbJson.drugs;
            for(var i = 0; i < items.length; i++){
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Drugs (text_id_1,text_id_2,text_id_3) VALUES (?,?,?)", [text_id_1, text_id_2, text_id_3]);
            }

            var items = dbJson.other;
            for(var i = 0; i < items.length; i++){
                var degree = items[i].degree;
                var description = items[i].description;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Other (degree, description, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [degree, description, text_id_1, text_id_2, text_id_3]);
            }

            var items = dbJson.other_tags;
            for(var i = 0; i < items.length; i++){
                var tag_name = items[i].tag_name;
                var offense_id = items[i].offense_id;
                $cordovaSQLite.execute(db, "INSERT INTO Other_Tags (tag_name, offense_id) VALUES (?,?)", [tag_name, offense_id]);
            }
            flag = true;
            $cordovaSplashscreen.hide();
            if(!flag){
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Could not populate Database'
                });
            }
            console.log("Database populated.");
        });

    });

})

.controller("RightsController", function($scope, $ionicHistory, $location, Rights, ContactService, Texts) {
    $scope.items = [];
    var asd = ["Soms gebeurt het dat de politie een eerste test uitvoert met een alco-sensor. Deze maakt eigenlijk geen deel uit van de eigenlijke alcoholcontrole.",
    "U wordt tegengehouden voor een ademtest. Deze geeft een eerste idee of u gedronken hebt. U kan meteen vragen om een wachttijd van 15 minuten. De politie dient u dan een verpakt mondstuk te tonen en dit mondstuk, zonder dit aan te raken, op het toestel te monteren. De politie dient het resultaat te tonen én luidop te lezen. Een S (safe) betekent dat u mag doorrijden. Een A (alarm) of P (positief) betekent dat u teveel gedronken hebt. Weigert u de test, dan wordt dat gelijkgesteld met een P en krijgt u een rijverbod van 6 uur.",
"Blies u een A of een P, dan moet ook een ademanalyse worden verricht. Deze geeft de precieze concentratie van alcohol weer. Als er meteen een ademanalyse wordt afgenomen (zonder ademtest), heeft u eveneens recht op een wachttijd van 15 minuten. De politie dient u mee te delen dat u recht heeft op een tweede analyse. Als u kiest voor een tweede analyse en de resultaten verschillen aanzienlijk, moet eventueel een derde analyse worden verricht. Blies u meer dan 0,22 mg/l lucht, maar minder dan 0,35 mg/l, dan krijgt u een rijverbod van 3 uur. Later wordt een boete thuisgestuurd. Blies u meer dan 0,35 mg/l lucht, dan krijgt u een rijverbod van minstens 6 uur. Nadien moet u opnieuw blazen. Later wordt een boete thuisgestuurd of wordt u gedagvaard. Als u meer dan 0,22 mg/l blaast, moet u een kopie ontvangen van elk ticket dat door het toestel wordt afgedrukt en dit uiterlijk binnen de 14 dagen. Blies u meer dan 0,35, dan dient de politie u mee te delen dat u steeds een tegenexpertise kan laten verrichten.",
"Een bloedproef wordt afgenomen wanneer ademtest en ademanalyse onmogelijk zijn of wanneer u er zelf om verzoekt. Ze kan enkel worden afgenomen door een dokter.",
"Uiterlijk 14 dagen na de vaststelling, moet u een kopie van het PV worden toegestuurd."];
for (var i = 0; i < asd.length; i++) {
    $scope.items.push({body:asd[i]});
}

    $scope.showAlch = function() {
        $scope.items.length = 0;
        Texts.getTest(0).then(function(res){
            for (var i = 0; i < res.length; i++) {
                $scope.items.push({body:res.item(i).body});
            }
        });
        $scope.selected = 1;
    };

    $scope.showDrugs = function() {
        $scope.items.length = 0;

        Texts.getTest(1).then(function(res){
            for (var i = 0; i < res.length; i++) {
                $scope.items.push({body:res.item(i).body});
            }
        });
        $scope.selected = 2;
    };

    $scope.test = function() {
    };

    $scope.goToContact = function(){
        ContactService.setFunctionality("Rights");
        $location.path("/contact");
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})

.controller("ContactController", function($scope, $ionicHistory, $ionicPopup, $http, Offenses, ContactService, TranslateService, Utils) {
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
            // if(Utils.validateEmail($scope.form.email)){
                var url = 'http://api.overtreding.be/overtreding_api/v1/test';
                var data = $scope.form;
                var functionalityTypeStr = ContactService.getFunctionality();
                switch (functionalityTypeStr) {
                    case "CalcFine":
                        var offenses = Offenses.parsed();
                        break;
                    case "TakePicture":
                        var imageData = ContactService.getImageData();
                    default:

                }
                var functionalityType = {functionality: TranslateService.englishToDutch(functionalityTypeStr)};
                var imageDataJson = {imageData: imageData};
                var offensesJson = {offenses: offenses};
                var result={};
                for(var key in data) result[key]=data[key];
                for(var key in functionalityType) result[key]=functionalityType[key];
                for(var key in offensesJson) result[key]=offensesJson[key];
                for(var key in imageDataJson) result[key]=imageDataJson[key];

                $http.post(url, result).then(function (res){
                    $scope.response = res.data;
                }, function(err){
                    $scope.response = err.code;
                });
            }
        };

        $scope.getCity = function(){
            var code = $scope.form.postcode;
            var asd = Utils.getNameForZipCode(code);
            $scope.form.postcode = asd;
        }

        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
    })

.controller("CalcFineController", function($scope, $ionicHistory, $ionicPopup, $location, Questions, Offenses, Utils, TranslateService, Formulas, Others2, ContactService) {
    $scope.offenses = [];
    $scope.searchResults = [];
    $scope.showSearch = false;
    $scope.inputs = {};
    $scope.menu = Questions.getQuestions("Menu");
    var indexShown = 0;
    var offense = null;
    $scope.isEditting = false;
    var edittingIndex = -1;
    addDummyOffense();
    resetFields();
    $scope.menuShown = true;
    $scope.doSomething = function(){
        $ionicPopup.alert({
            title: 'INFORMATIE',
            template: 'Gelieve alle velden van een antwoord te voorzien'
        });
    };
    $scope.menuSubgroupTapped = function(menuItem){
        var type = TranslateService.dutchToEnglish(menuItem);
        offense = Offenses.createDefault(type);
        $scope.offenses.splice($scope.offenses.length -1, 1, offense);

        $scope.questions = Questions.getQuestions(type);
        $scope.menuShown = false;

        var offenses = Offenses.all();
        if(offenses.length > 0){
            var firstOffense = Offenses.findById(0);
            offense.age = firstOffense.age;
            offense.licence = firstOffense.licence;
            if(offense.age === 0){
                $scope.questions[1].name = "JONGER DAN 18 JAAR";
            }
            else{
                $scope.questions[1].name = "18 JAAR OF OUDER";

            }
            if(offense.licence === 0){
                $scope.questions[0].name = "IK BEZIT MIJN RIJBEWIJS MINDER DAN 2 JAAR";
            }
            else{
                $scope.questions[0].name = "IK BEZIT MIJN RIJBEWIJS LANGER DAN 2 JAAR";
            }

            indexShown = 2;
        }
        if(type === "Speed"){
            $scope.questionsShown = true;
            $scope.showInput = true;
        }
        else{
            $scope.questionsShown = true;
            $scope.toggleBorder($scope.questions[$scope.questions.length - 1]);
        }

        if(type === "Other"){
            $scope.questionsShown = false;
            $scope.showSearch = true;
            $scope.searchMessage = "Vul hierboven een trefwoord of artikelnummer in en zoek uw overtreding. Voeg een komma toe om te zoeken door middel van meerdere trefwoorden.";
        }
        var questionsLen = $scope.questions.length;
        if(questionsLen <= indexShown){
        }
        else{
            $scope.toggleBorder($scope.questions[indexShown]);
        }
    };

    $scope.subgroupTapped = function(item, group, index) {
        $scope.questions[group.id].name = item;
        var fieldName = Offenses.getFieldName(group.id, offense["type"]);
        offense[fieldName] = index;

        if(group.id === 0){
            if(index === 1){
                indexShown++;
                offense.age = 1;
                $scope.questions[1].name = "18 JAAR OF OUDER";
            }
        }
        if($scope.isEditting){
            if(group.id === 0){
                var offenses = Offenses.all();
                for (var i = 0; i < offenses.length; i++) {
                    var fOffense = offenses[i];
                    if(index === 1){
                        fOffense.licence = index;
                        fOffense.age = index;
                    }
                    else{
                        fOffense.licence = index;
                    }
                }
            }
            if(group.id === 1){
                var offenses = Offenses.all();
                for (var i = 0; i < offenses.length; i++) {
                    var fOffense = offenses[i];
                    fOffense.age = index;
                }
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
    $scope.editOffense = function(index){
        var flag = true;
        if($scope.isEditting){
            flag = false;
            $ionicPopup.alert({
                title: 'Error',
                template: 'Please finish editting your offense'
            });
        }
        else{
        if(offense != null){
            if(offense.type === "" || !Utils.validateOffense(offense)){
                $scope.offenses.pop();
            }
            else{
                addCurrOffense();
            }
        }
        $scope.isEditting = true;
        edittingIndex = index;
        var fetchedOffense = Offenses.findById(index);
        offense = fetchedOffense;
        resetFields();
        $scope.menuShown = false;
        $scope.questions = Questions.getQuestions(fetchedOffense.type);
        $scope.toggleBorder($scope.questions[0]);
        if(fetchedOffense.type != "Speed"){
            $scope.toggleBorder($scope.questions[$scope.questions.length-1]);
        }
        $scope.questionsShown = true;

        for (var key in fetchedOffense) {
            if (fetchedOffense.hasOwnProperty(key)) {
                if(key === "type" || (key === "speed_corrected" || key==="speed_driven")){
                }
                else{
                    var index = -1;
                    switch (key) {
                        case 'licence':
                        index = 0;
                        break;
                        case 'age':
                        index = 1;
                        break;
                        case 'road':
                        index = 2;
                        break;
                        case 'speed_limit':
                        index = 3;
                        break;
                        case 'driver':
                        index = 2;
                        break;
                        case 'intoxication':
                        index = 3;
                        break;
                        case 'blood_test':
                        index = 2;
                        break;
                        default:
                    }
                    $scope.questions[index].name = Questions.getQuestionsForField(key)[fetchedOffense[key]];
                }
            }
        }
        if(offense.type === "Speed"){
            $scope.showInput = true;
            $scope.inputs.speed_driven = offense.speed_driven;
            $scope.inputs.speed_corrected = offense.speed_corrected;

        }
    }
    };
    $scope.submitEdit = function(){
        $scope.questionsShown = false;
        $scope.showInput = false;
        $scope.isEditting = false;
        edittingIndex = -1;
        Offenses.replaceAtIndex(edittingIndex, offense);
        offense = null;
    };

    $scope.createNewOffense = function(){
        if(offense === null){
            addDummyOffense();
            resetFields();
            $scope.menuShown = true;
        }
        else{
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
        }
    };

    $scope.removeOffense = function(index){
        var confirmPopup = $ionicPopup.confirm({
            title: 'INFORMATIE',
            template: 'Bent u zeker dat u deze overtreding wil verwijderen ?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                if($scope.isEditting){
                    resetFields();
                    offense = null;
                    $scope.isEditting = false;
                    $scope.offenses.splice(index, 1);
                    Offenses.remove(index);
                }
                else{
                    if(index === $scope.offenses.length -1){
                        $scope.offenses.splice(index, 1);
                        resetFields();
                        $scope.menuShown = false;
                        offense = null;
                    }
                    else{
                        $scope.offenses.splice(index, 1);
                        Offenses.remove(index);
                    }
                }
            }
        });
    };

    $scope.resultTapped = function() {
        var offenses = Offenses.all();
        var flag = false;

        if($scope.isEditting){
            $ionicPopup.alert({
                title: 'INFORMATIE',
                template: 'Gelieve alle velden van een antwoord te voorzien'
            });
        }
        {
            if(offense === null){
                if(offenses.length === 1){
                    $location.path("/result/0");
                }
                else{
                    $location.path("/result");
                }
            }
            else{
                if(offense.type === "Speed"){
                    var input = $scope.inputs.speed_driven;
                    var speedDriven = parseInt(input);
                    var speedCorrected = Formulas.getCorrectedSpeed(speedDriven);
                    var speedLimit = (offense.speed_limit+1) * 10;
                    if(speedCorrected <= speedLimit){
                        flag = true;
                        $ionicPopup.alert({
                            title: 'INFORMATIE',
                            template: 'De gecorrigeerde snelheid kan niet lager zijn dan snelheidslimiet. Gelieve opnieuw te proberen.'
                        });
                    }
                }
                if(!flag){
                    if(addCurrOffense()){
                        resetFields();
                        offense = null;
                        var offenses = Offenses.all();
                        if(offenses.length === 1){
                            $location.path("/result/0");
                        }
                        else{
                            $location.path("/result");
                        }

                    }
                    else{
                        $ionicPopup.alert({
                            title: 'INFORMATIE',
                            template: 'Gelieve alle velden van een antwoord te voorzien'
                        });
                    }
                }
            }
        }
    };

    $scope.calcSpeed = function() {
        var input = $scope.inputs.speed_driven;
        var valid = true;

        if(isNaN(input)){
            valid = false;
            $scope.inputs.speed_driven = "";
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
                $scope.inputs.speed_corrected = speedCorrected;
            }
            else{
            $scope.inputs.speed_corrected = speedCorrected;
        }

        }
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
        }
    };

    $scope.calcSpeed2 = function() {
        var input = $scope.inputs.speed_corrected;
        var valid = true;

        if(isNaN(input)){
            valid = false;
            $scope.inputs.speed_driven = "";
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
                $scope.inputs.speed_driven = speedDriven;
            }
            else{
                $scope.inputs.speed_driven = speedDriven;
            }
        }
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
        }
    };

    $scope.search = function() {
        offense.age = 0;
        offense.licence = 0;
        $scope.searchResults.length = 0;
        $scope.questionsShown = false;
        var searchWords = $scope.inputs.searchWord;
        searchWords = searchWords.toLowerCase();
        var searchArr = Utils.multiSplit(searchWords,[',',' ']);
        Others2.searchOthers(searchArr).then(function(res){
            for (var i = 0; i < res.length; i++) {
                $scope.searchResults.push({
                    id: res.item(i).id,
                    degree: res.item(i).degree,
                    description: res.item(i).description});
                }
                if(res.length === 0){
                    $scope.searchMessage = "Er is geen resultaat voor uw zoekopdracht. Gelieve opnieuw te proberen met andere trefwoorden";
                }
            });
    };

    $scope.otherTapped = function(item) {
        $scope.searchResults.length = 0;
        $scope.searchResults.push(item);
        offense.id = item.id;
        offense.degree = item.degree;
        offense.description = item.description;
        $scope.questionsShown = true;
    };

    function addDummyOffense(){
        offense = {type: ""};
        $scope.offenses.push(offense);
    }

    function addCurrOffense(){
        var valid = Utils.validateOffense(offense) && offense.type != "";
        if(valid){
            Offenses.add(offense);
            return true;
        }
        return false;
    }

    function resetFields(){
        indexShown = 0;
        $scope.questionsShown = false;
        $scope.showSearch = false;
        $scope.showInput = false;
        $scope.searchResults.length = 0;
        $scope.inputs.speed_driven = "";
        $scope.inputs.speed_corrected = "";
        $scope.inputs.searchWord = "";
    }

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
})

.controller("ResultController", function($scope, $ionicHistory, $location, Offenses, CombinedFines, FinesCalculator, Texts, ExceptionTexts, ContactService) {
    var offenses = Offenses.all();
    $scope.offenses = offenses;

    var qualifyOI = CombinedFines.qualifyOI();
    var qualifyMS = CombinedFines.qualifyMS();
    var sumOI = 0;
    var sumMS = 0;

    $scope.message = "Maak uw keuze uit de onderstaande samengestelde overtredingen en ontdek welke gevolgen elke overtreding met zich meebrengt.\n Wenst u graag meer informatie over deze overtredingen, aarzel niet en vraag GRATIS juridisch advies aan via onderstaande button.";

    ExceptionTexts.getExceptionTexts().then(function(res2){
        var excTexts = [];
        for (var i = 0; i < res2.length; i++) {
            excTexts.push(res2.item(i).body);
        }
    });
    var excIdsMS = [11,15,30,31,51,59,65];
    var excIdsOI = [10,13,17,27,29,33,35,41,50,58];

        for (var i = 0; i < offenses.length; i++) {
            var offense  = offenses[i];
            var texts = [];
            var fines = FinesCalculator.getFines(offense);
            for (var key in fines) {
                if (fines.hasOwnProperty(key)) {
                    console.log(key + " -> " + fines[key]);
                    if(key === "#TOTALAMOUNT3#" || key === "#TOTALAMOUNT5#"){
                    var fineString = fines[key].toString();
                    var fineAmounts = fineString.split(" tot ");
                    sumOI +=parseInt(fineAmounts[0]);
                    }
                    if(key === "#TOTALAMOUNT4#" || key === "#TOTALAMOUNT6#"){
                    var fineString = fines[key].toString();
                    var fineAmounts = fineString.split(" tot ");
                    sumMS +=parseInt(fineAmounts[0]);
                    }
                }
            }
            Texts.getTexts(offense).then(function(res){
                    for (var j = 0; j < excIdsMS.length; j++) {
                        if(excIdsMS[j] === res.item(1).id){
                            qualifyMS = false;
                        }
                    }

                    for (var k = 0; k < excIdsOI.length; k++) {
                        if(excIdsOI[k] === res.item(0).id){
                            qualifyOI = false;
                        }
                    }

                if(offense.type != "Alchohol"){
                sumOI += FinesCalculator.getFinesForText(res.item(0).body);
                sumMS += FinesCalculator.getFinesForText(res.item(1).body);
                }
                console.log(sumOI);
                console.log(sumMS);
                if(sumOI > 330){
                    qualifyOI = false;
                }
                if(sumOI > 1500){
                    qualifyMS = false;
                }
                if(sumMS > 1500){
                    qualifyMS = false;
                }

                if(!qualifyOI){
                    $scope.message = "De door u samengestelde overtredingen zorgen ervoor dat u niet in aanmerking komt voor een onmiddellijke inning. U komt wel in aanmerking voor een minnelijke schikking.\nMaak uw keuze uit de onderstaande samengestelde overtredingen en ontdek welke gevolgen elke overtreding met zich meebrengt.\nWilt u meer informatie over de gevolgen die zich kunnen voordoen als u voor de rechtbank moet verschijnen, aarzel niet en vraag GRATIS juridisch advies aan via onderstaande button.";
                }
                if(!qualifyMS){
                    $scope.message = "De door u samengestelde overtredingen zorgen ervoor dat u niet in aanmerking komt voor een onmiddellijke inning of minnnelijke schikking. U zal sowieso voor de rechtbank moeten verschijnen.\nMaak uw keuze uit de onderstaande samengestelde overtredingen en ontdek welke gevolgen elke overtreding met zich meebrengt.\n Wenst u graag meer informatie over deze overtrendigen, aarzel niet en vraag GRATIS juridisch advies aan via onderstaande button.";
                }
            });
        }

    $scope.goToContact = function(){
        ContactService.setFunctionality("CalcFine");
        $location.path("/contact");
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
})

.controller("ResultDetailController", function($scope, $ionicHistory, $stateParams, $ionicPopup, Offenses, FinesCalculator,Utils, Texts, OffenseEvaluator, $location, ContactService) {
    $scope.items = [];
    var texts = [];
    var titles = ["ONMIDDELLIJKE INNING", "MINNELIJKE SCHIKKING", "BEVEL TOT BETALING/RECHTBANK"];
    $scope.titles = titles;

    var offense = Offenses.findById($stateParams.offenseId);
    var offenseDisplayId = parseInt($stateParams.offenseId) + 1;
    $scope.offenseId = offenseDisplayId;
    $scope.offenseType = offense.type;

    var fines = FinesCalculator.getFines(offense);
    Texts.getTexts(offense).then(function(res){
        for (var i = 0; i < res.length; i++) {
            texts.push(Utils.replaceFines(res.item(i).body, fines));
        }
        OffenseEvaluator.evaluateOffense(texts, offense);
        OffenseEvaluator.evaluateCombined(texts);
    });
    $scope.items = texts;

    $scope.goToContact = function(){
        ContactService.setFunctionality("CalcFine");
        $location.path("/contact");
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})

.controller("TakePictureController", function($scope, $ionicHistory, $ionicPopup, $location,Camera, ContactService, Utils) {
    $scope.src = "";
    var confirmPopup = $ionicPopup.alert({
        title: 'INFORMATIE',
        template:  "Gelieve een foto te nemen van de brief die u ontving en deze door te sturen via de button vraag GRATIS juridisch advies.\n Wij bekijken dan wat wij voor u kunnen doen en nemen contact met u op. Alvast bedankt!"
    });
    confirmPopup.then(function(res) {
        if(res) {
            Camera.getPicture().then(function(imageURI) {
                $scope.src = imageURI;
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
            ContactService.setFunctionality("TakePicture");
            ContactService.setImageData(Utils.encodeImageUri($scope.src));
            $location.path("/contact");
        }
        console.log($scope.src);
    }
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
});
