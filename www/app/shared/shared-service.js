"use strict";

angular.module("ngapp").service("shared", function($http, $localStorage, $mdToast){ 

    var ctrl = this;
    this.$storage = $localStorage;
    if(!this.$storage.settings) this.$storage.settings = {"starredEvents":{}, "ratedSessions":[]};

    this.lastNotification = null;
    this.lastDataUpdate = 0;
    this.apiSrv = 'http://proxy.nubenum.de/ebs.api.nubenum.de/v1/';
    this.updateRequired = false;
    this.defaultData = { 
        "meta" : {"ts" : 103, "appv" : 1, "apiv": 1},
        "speakers" : [{"id":"auschel-roland","name":"Roland Auschel","info":"Member of Executive Board, Global Sales","online":false},{"id":"baier-moritz","name":"Moritz Baier","info":"Forbes 30 Under 30, Goldman Sachs","online":false},{"id":"boersch-marc-aurel","name":"Marc-Aurel Boersch","info":"CEO Nestle\u0301 Netherlands","online":false},{"id":"burghardt-markus","name":"Markus Burghardt","info":"German Financial Services Leader, Member of the German Management Board","online":false},{"id":"damme-niek-jan-van","name":"Niek Jan van Damme","info":"Member of Management Board","online":false},{"id":"dombret-prof-dr-andreas","name":"Prof. Dr. Andreas Dombret","info":"Member of the Executive Board","online":false},{"id":"fink-dr-wolfgang","name":"Dr. Wolfgang Fink","info":"Co-CEO Goldman Sachs Germany & Austria","online":false},{"id":"holzer-peter","name":"Peter Holzer","info":"Keynote Speaker, Author, Executive Coach","online":false},{"id":"karapandza-prof-rasa","name":"Prof. Rasa Karapandza","info":"Chaired Professor of Finance","online":false},{"id":"kopp-matthias","name":"Matthias Kopp","info":"Head Low Carbon Business and Finance Sector","online":false},{"id":"kratz-carsten","name":"Carsten Kratz","info":"Head of Management Team","online":false},{"id":"kretzberg-alena","name":"Alena Kretzberg","info":"Partner McKinsey & Company","online":false},{"id":"martin-andrea","name":"Andrea Martin","info":"CTO IBM Germany, Austria, Switzerland","online":false},{"id":"schafer-daniel","name":"Daniel Scha\u0308fer","info":"Finance Editor & Frankfurt Bureau Chief","online":false},{"id":"schellenberg-daniel","name":"Daniel Schellenberg","info":"Vice President","online":false},{"id":"schulte-dr-stefan","name":"Dr. Stefan Schulte","info":"CEO","online":false},{"id":"schwenker-prof-dr-burkhard","name":"Prof. Dr. Burkhard Schwenker","info":"Chairman of the Advisory Coucil","online":false},{"id":"steilemann-dr-markus","name":"Dr. Markus Steilemann","info":"Member of Management Board","online":false},{"id":"welbers-dr-georg","name":"Dr. Georg Welbers","info":"Member of Management Board","online":false}],
        "partners" : [{"id":"4c","name":"4C"},{"id":"accenture","name":"accenture"},{"id":"bahlsen","name":"Bahlsen"},{"id":"bcg-boston-consulting-group","name":"BCG Boston Consulting Group"},{"id":"bearingpoint","name":"BearingPoint"},{"id":"capgemini-consulting","name":"Capgemini Consulting"},{"id":"citi","name":"Citi"},{"id":"commerz-real","name":"Commerz Real"},{"id":"kloeckner-co","name":"Kl\u00f6ckner &#038; Co"},{"id":"kpmg","name":"KPMG"},{"id":"mckinseycompany","name":"McKinsey&#038;Company"},{"id":"mlp","name":"MLP"},{"id":"porsche-consulting","name":"Porsche Consulting"},{"id":"pwc","name":"pwc"},{"id":"roland-berger","name":"Roland Berger"},{"id":"rothschild","name":"Rothschild"},{"id":"volkswagen-consulting","name":"Volkswagen Consulting"},{"id":"zeb","name":"zeb"}],
        "schedule" : [
            {"type": "speech", "id": "how-to-save-the-planet", "day" : 28, "start": ["11:45"], "duration": 30, "room": "Forum", "title": "How to save the planet", "speakerId": "baier-moritz", "alert": ""},
            {"type": "interview", "id": "a-cool-interview", "day" : 28, "start": ["11:45", "12:00"], "duration": 20, "room": "Forum", "title": "A cool interview", "speakerId": "baier-moritz", "alert": ""},
            {"type": "speech", "id": "a-generic-speech", "day" : 28, "start": ["11:30"], "duration": 30, "room": "KEB Forum", "title": "A generic speech", "speakerId": "schafer-daniel", "alert": ""},
            {"type": "speech", "id": "how-to-succeed-in-life", "day" : 29, "start": ["13:00"], "duration": 30, "room": "Forum", "title": "How to succeed in life", "speakerId": "steilemann-dr-markus", "alert": ""},
            {"type": "speech", "id": "what-to-do-next", "day" : 30, "start": ["10:00"], "duration": 60, "room": "KEB Forum", "title": "What to do next", "speakerId": "auschel-roland", "alert": ""}
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

    this.getStarredScheduleString = function() {
        var obj = ctrl.$storage.settings.starredEvents;
        var concat = '';
        angular.forEach(obj, function(value, key) {
            if (value) concat += ','+key;
        });
        return concat.substring(1);
    }

    this.updateData = function(force) {
        var d = new Date();
        if (!force && d.getTime()-ctrl.lastDataUpdate < 1000000) return;
        var apiUrl =  ctrl.apiSrv+'data.php?appv='+ctrl.defaultData.meta.appv+'&fcmt='+ctrl.getUniqueToken()+'&reminders='+!!ctrl.$storage.settings.reminders+'&starred='+ctrl.getStarredScheduleString();
        $http({method: 'GET',url:apiUrl})
        .then(function successCallback(response) {
            console.log('data received', apiUrl);
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
