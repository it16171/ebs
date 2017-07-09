"use strict";

angular.module("ngapp").service("shared", function($http, $localStorage, $mdToast){ 

    var ctrl = this;
    this.$storage = $localStorage;
    if(!this.$storage.settings) this.$storage.settings = {"starredEvents":{}, "ratedSessions":[]};

    this.lastNotification = null;
    this.lastDataUpdate = 0;
    this.apiSrv = 'http://proxy.nubenum.de/ebs.api.nubenum.de'
    this.updateRequired = false;
    this.defaultData = {
        "meta" : {"ts" : 100, "appv" : 1, "apiv": 1},
        "speakers" : [{"id":"roland-auschel","name":"Roland Auschel","desc":"Member of Management Board \/\/ Adidas"},{"id":"moritz-baier","name":"Moritz Baier","desc":"Associate \/\/ Forbes 30 under 30, Goldman Sachs"},{"id":"prof-dr-andreas-dombret","name":"Prof. Dr. Andreas Dombret","desc":"Member of Management Board \/\/ Bundesbank"},{"id":"peter-holzer","name":"Peter Holzer","desc":"Keynote Speaker, Executive Coach, Consultant"},{"id":"prof-rasa-karapanza","name":"Prof. Rasa Karapanza","desc":"Professor of Finance \/\/ EBS"},{"id":"matthias-kopp","name":"Matthias Kopp","desc":"Head Low Carbon Business and Finance Sector \/\/ WWF"},{"id":"carsten-kratz","name":"Carsten Kratz","desc":"Head of the Management Team \/\/ BCG Germany & Austria"},{"id":"alena-kretzberg","name":"Alena Kretzberg","desc":"Partner \/\/ McKinsey "},{"id":"andrea-martin","name":"Andrea Martin","desc":"CTO \/\/ IBM Germany"},{"id":"daniel-schellenberg","name":"Daniel Schellenberg","desc":"Vice President \/\/ IDEE GmbH"},{"id":"dr-stefan-schulte","name":"Dr. Stefan Schulte","desc":"CEO \/\/ Fraport"},{"id":"prof-dr-burkhard-schwenker","name":"Prof. Dr. Burkhard Schwenker","desc":"Chairman of the Advisory Council \/\/ Roland Berger"},{"id":"dr-markus-steilemann","name":"Dr. Markus Steilemann","desc":"Member of Management Board, Innovation \/\/ Covestro"},{"id":"dr-georg-welbers","name":"Dr. Georg Welbers","desc":"Member of Management Board \/\/ Thomas Cook"}],
        "partners" : [{"id":"4c","name":"4C"},{"id":"accenture","name":"accenture"},{"id":"bahlsen","name":"Bahlsen"},{"id":"bcg-boston-consulting-group","name":"BCG Boston Consulting Group"},{"id":"bearingpoint","name":"BearingPoint"},{"id":"capgemini-consulting","name":"Capgemini Consulting"},{"id":"citi","name":"Citi"},{"id":"commerz-real","name":"Commerz Real"},{"id":"kloeckner-co","name":"Kl\u00f6ckner &#038; Co"},{"id":"kpmg","name":"KPMG"},{"id":"mckinseycompany","name":"McKinsey&#038;Company"},{"id":"mlp","name":"MLP"},{"id":"porsche-consulting","name":"Porsche Consulting"},{"id":"pwc","name":"pwc"},{"id":"roland-berger","name":"Roland Berger"},{"id":"rothschild","name":"Rothschild"},{"id":"volkswagen-consulting","name":"Volkswagen Consulting"},{"id":"zeb","name":"zeb"}],
        "schedule" : [
            {"id": "how-to-save-the-planet", "day" : 28, "time": "10:00-11:30", "title": "How to save the planet", "speakerId": "moritz-baier", "alert": ""},
            {"id": "a-generic-speech", "day" : 28, "time": "10:00-11:30", "title": "A generic speech", "speakerId": "roland-auschel", "alert": ""},
            {"id": "how-to-succeed-in-life", "day" : 29, "time": "10:00-11:30", "title": "How to succeed in life", "speakerId": "prof-dr-andreas-dombret", "alert": ""},
            {"id": "what-to-do-next", "day" : 30, "time": "10:00-11:30", "title": "What to do next", "speakerId": "roland-auschel", "alert": ""}
        ],
        "pickupLocations" : [
            {"id": "oestrich-winkel-bhf", "lat": 50.002455, "lon" : 8.019080, "name": "Oestrich-Winkel Bhf"},
            {"id": "eltville-bhf", "lat": 50.027414, "lon" : 8.121395, "name": "Eltville Bhf"}
        ]
    };

    this.getObjectById = function(needle, haystack) {
        for (var i=0;i<haystack.length;i++) {
            if (haystack[i].id == needle) return haystack[i];
        }
        return null;
    }

    this.isCurrentData = function(incomingData) {
        if (incomingData && incomingData.meta) {
            if(ctrl.defaultData.meta.appv < incomingData.meta.appv) this.updateRequired = true;
            else this.updateRequired = false;
            if (ctrl.defaultData.meta.apiv == incomingData.meta.apiv && ctrl.$storage.data.meta.ts < incomingData.meta.ts) {
                return true;
            }
        } 
        return false;
    }
   
    if (!ctrl.isCurrentData(this.$storage.data)) {
        this.$storage.data = this.defaultData;
    } 

    this.getUniqueToken = function () {
        //TODO gen token if fcmt not set
        if (!ctrl.$storage.settings.fcmt) { 
            var d = new Date();
            ctrl.$storage.settings.fcmt = "substitute-"+d.getTime();
        }
        return ctrl.$storage.settings.fcmt;
    }

    this.updateData = function() {
        var d = new Date();
        if (d.getTime()-ctrl.lastDataUpdate < 1000000) return;

        $http({method: 'GET',url: this.apiSrv+'/v1/data.json?appv='+ctrl.defaultData.meta.appv})
        .then(function successCallback(response) {
            if (ctrl.isCurrentData(response.data)) {
                ctrl.$storage.data = response.data;
                console.log('data updated');
            }
            ctrl.lastDataUpdate = d.getTime();
        }, function errorCallback(response) {
            console.log('no conn');
        });     

        
    }

    

    
    
    
});
