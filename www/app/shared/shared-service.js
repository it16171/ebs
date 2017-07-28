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
        "meta" : {"ts" : 103, "appv" : 1, "apiv": 1},
        "speakers" : [{"id":"auschel-roland","name":"Roland Auschel","info":"Member of Executive Board, Global Sales","hasLogo":true},{"id":"baier-moritz","name":"Moritz Baier","info":"Forbes 30 Under 30, Goldman Sachs","hasLogo":true},{"id":"boersch-marc-aurel","name":"Marc-Aurel Boersch","info":"CEO Nestle\u0301 Netherlands","hasLogo":true},{"id":"burghardt-markus","name":"Markus Burghardt","info":"German Financial Services Leader, Member of the German Management Board","hasLogo":true},{"id":"damme-niek-jan-van","name":"Niek Jan van Damme","info":"Member of Management Board","hasLogo":true},{"id":"dombret-prof-dr-andreas","name":"Prof. Dr. Andreas Dombret","info":"Member of the Executive Board","hasLogo":true},{"id":"fink-dr-wolfgang","name":"Dr. Wolfgang Fink","info":"Co-CEO Goldman Sachs Germany & Austria","hasLogo":true},{"id":"holzer-peter","name":"Peter Holzer","info":"Keynote Speaker, Author, Executive Coach","hasLogo":false},{"id":"karapandza-prof-rasa","name":"Prof. Rasa Karapandza","info":"Chaired Professor of Finance","hasLogo":true},{"id":"kopp-matthias","name":"Matthias Kopp","info":"Head Low Carbon Business and Finance Sector","hasLogo":true},{"id":"kratz-carsten","name":"Carsten Kratz","info":"Head of Management Team","hasLogo":true},{"id":"kretzberg-alena","name":"Alena Kretzberg","info":"Partner McKinsey & Company","hasLogo":true},{"id":"martin-andrea","name":"Andrea Martin","info":"CTO IBM Germany, Austria, Switzerland","hasLogo":true},{"id":"schafer-daniel","name":"Daniel Scha\u0308fer","info":"Finance Editor & Frankfurt Bureau Chief","hasLogo":true},{"id":"schellenberg-daniel","name":"Daniel Schellenberg","info":"Vice President","hasLogo":true},{"id":"schulte-dr-stefan","name":"Dr. Stefan Schulte","info":"CEO","hasLogo":true},{"id":"schwenker-prof-dr-burkhard","name":"Prof. Dr. Burkhard Schwenker","info":"Chairman of the Advisory Coucil","hasLogo":true},{"id":"steilemann-dr-markus","name":"Dr. Markus Steilemann","info":"Member of Management Board","hasLogo":true},{"id":"welbers-dr-georg","name":"Dr. Georg Welbers","info":"Member of Management Board","hasLogo":true}],
        "partners" : [{"id":"4c","name":"4C"},{"id":"accenture","name":"accenture"},{"id":"bahlsen","name":"Bahlsen"},{"id":"bcg-boston-consulting-group","name":"BCG Boston Consulting Group"},{"id":"bearingpoint","name":"BearingPoint"},{"id":"capgemini-consulting","name":"Capgemini Consulting"},{"id":"citi","name":"Citi"},{"id":"commerz-real","name":"Commerz Real"},{"id":"kloeckner-co","name":"Kl\u00f6ckner &#038; Co"},{"id":"kpmg","name":"KPMG"},{"id":"mckinseycompany","name":"McKinsey&#038;Company"},{"id":"mlp","name":"MLP"},{"id":"porsche-consulting","name":"Porsche Consulting"},{"id":"pwc","name":"pwc"},{"id":"roland-berger","name":"Roland Berger"},{"id":"rothschild","name":"Rothschild"},{"id":"volkswagen-consulting","name":"Volkswagen Consulting"},{"id":"zeb","name":"zeb"}],
        "schedule" : [
            {"id": "how-to-save-the-planet", "day" : 28, "time": "10:00-11:30", "title": "How to save the planet", "speakerId": "baier-moritz", "alert": ""},
            {"id": "a-generic-speech", "day" : 28, "time": "10:00-11:30", "title": "A generic speech", "speakerId": "schafer-daniel", "alert": ""},
            {"id": "how-to-succeed-in-life", "day" : 29, "time": "10:00-11:30", "title": "How to succeed in life", "speakerId": "steilemann-dr-markus", "alert": ""},
            {"id": "what-to-do-next", "day" : 30, "time": "10:00-11:30", "title": "What to do next", "speakerId": "auschel-roland", "alert": ""}
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
