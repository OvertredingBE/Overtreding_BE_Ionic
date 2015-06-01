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
    });
