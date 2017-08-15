"use strict";

angular.module("ngapp").service("shared", function($http, $localStorage, $mdToast){ 

    var ctrl = this;
    this.$storage = $localStorage;
    if(!this.$storage.settings) this.$storage.settings = {"starredEvents":{}, "ratedSessions":[]};

    this.lastDataUpdate = 0;
    this.apiSrv = 'http://proxy.nubenum.de/ebs.api.nubenum.de/v1/';
    this.updateRequired = false;
    this.defaultData = { 
        "meta" : {"ts" : 114, "appv" : 1, "apiv": 1},
        "speakers" : [{"id":"auschel-roland","name":"Roland Auschel","info":"Member of Executive Board, Global Sales","online":false},{"id":"baier-moritz","name":"Moritz Baier","info":"Forbes 30 Under 30, Goldman Sachs","online":false},{"id":"boersch-marc-aurel","name":"Marc-Aurel Boersch","info":"CEO Nestle\u0301 Netherlands","online":false},{"id":"burghardt-markus","name":"Markus Burghardt","info":"German Financial Services Leader, Member of the German Management Board","online":false},{"id":"damme-niek-jan-van","name":"Niek Jan van Damme","info":"Member of Management Board","online":false},{"id":"dombret-prof-dr-andreas","name":"Prof. Dr. Andreas Dombret","info":"Member of the Executive Board","online":false},{"id":"fink-dr-wolfgang","name":"Dr. Wolfgang Fink","info":"Co-CEO Goldman Sachs Germany & Austria","online":false},{"id":"holzer-peter","name":"Peter Holzer","info":"Keynote Speaker, Author, Executive Coach","online":false},{"id":"karapandza-prof-rasa","name":"Prof. Rasa Karapandza","info":"Chaired Professor of Finance","online":false},{"id":"kopp-matthias","name":"Matthias Kopp","info":"Head Low Carbon Business and Finance Sector","online":false},{"id":"kratz-carsten","name":"Carsten Kratz","info":"Head of Management Team","text":"Lorem ipsum dolor sit amet","online":false},{"id":"kretzberg-alena","name":"Alena Kretzberg","info":"Partner McKinsey & Company","online":false},{"id":"martin-andrea","name":"Andrea Martin","info":"CTO IBM Germany, Austria, Switzerland","online":false},{"id":"schafer-daniel","name":"Daniel Scha\u0308fer","info":"Finance Editor & Frankfurt Bureau Chief","online":false},{"id":"schellenberg-daniel","name":"Daniel Schellenberg","info":"Vice President","online":false},{"id":"schulte-dr-stefan","name":"Dr. Stefan Schulte","info":"CEO","online":false},{"id":"schwenker-prof-dr-burkhard","name":"Prof. Dr. Burkhard Schwenker","info":"Chairman of the Advisory Coucil","online":false},{"id":"steilemann-dr-markus","name":"Dr. Markus Steilemann","info":"Member of Management Board","online":false},{"id":"welbers-dr-georg","name":"Dr. Georg Welbers","info":"Member of Management Board","online":false}],
        "partners" : [{"type":"partner","id":"accenture","online":false},{"type":"partner","id":"bahlsen","online":false},{"type":"partner","id":"bcg","online":false},{"type":"partner","id":"bearingpoint","online":false},{"type":"partner","id":"c-group","online":false},{"type":"partner","id":"capgemini-consulting","online":false},{"type":"partner","id":"citi","online":false},{"type":"partner","id":"commerz-real","online":false},{"type":"partner","id":"klocknerco","online":false},{"type":"partner","id":"kpmg","online":false},{"type":"partner","id":"mckinsey","online":false},{"type":"partner","id":"mlp","online":false},{"type":"partner","id":"porsche-consulting","online":false},{"type":"partner","id":"pwc","online":false},{"type":"partner","id":"roland-berger-logo","online":false},{"type":"partner","id":"rothschild","online":false},{"type":"partner","id":"volkswagen-consulting","online":false},{"type":"partner","id":"zeb","online":false},{"type":"sponsor","id":"ardologo-new-q","online":false},{"type":"sponsor","id":"chialogocmyk","online":false},{"type":"sponsor","id":"dewaterelogo","online":false},{"type":"sponsor","id":"fitvia-logo","online":false},{"type":"sponsor","id":"guampac-","online":false},{"type":"sponsor","id":"hela-logo-rgb","online":false},{"type":"sponsor","id":"icon-logo-","online":false},{"type":"sponsor","id":"image","online":false},{"type":"sponsor","id":"jmsecondaryonorangecmyk","online":false},{"type":"sponsor","id":"kalemelogoblack","online":false},{"type":"sponsor","id":"kalemelogoblacklarge","online":false},{"type":"sponsor","id":"logo","online":false},{"type":"sponsor","id":"logo-gerster-wagneranthrazit","online":false},{"type":"sponsor","id":"logo-x-fuer-druck-mit-inhaber-pw","online":false},{"type":"sponsor","id":"lorenzc","online":false},{"type":"sponsor","id":"lorenzc","online":false},{"type":"sponsor","id":"lschwcsimple","online":false},{"type":"sponsor","id":"mymueslilogosrgb","online":false},{"type":"sponsor","id":"nicnacscmyk","online":false},{"type":"sponsor","id":"proviant-manufaktur-logo","online":false},{"type":"sponsor","id":"rhinoslogotypelandscapec-","online":false},{"type":"sponsor","id":"sflogoclaim-welle-claim-farbig","online":false},{"type":"sponsor","id":"weingut-robert-weil-logo","online":false},{"type":"sponsor","id":"weingut-weillogokopfc","online":false}],
        "schedule" : [
            {"type": "speech", "id": "opening", "day" : 28, "start": "15:00", "duration": 75, "room": "Forum", "speakers": ["anonymous"], "alert": "", "title": "Opening Speech", "info": ""},
            {"type": "speech", "id": "kratz-carsten", "day" : 28, "start": "17:00", "duration": 60, "room": "Forum", "speakers": ["kratz-carsten"], "alert": "", "title": "", "info": ""},
            {"type": "panel", "id": "geopolitics-panel", "day" : 28, "start": "18:15", "duration": 90, "room": "Forum", "speakers": ["mulherr-silke", "schulte-dr-stefan", "kownatzki-dr-max", "koth-alexander"], "alert": "", "title": "Geopolitics Panel", "info": "Lorem lorem"},
        
            {"type": "speech", "id": "kretzberg-alena", "day" : 29, "start": "10:00", "duration": 60, "room": "Forum", "speakers": ["kretzberg-alena"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "miroschedji-dr-sania-a-de", "day" : 29, "start": "10:00", "duration": 60, "room": "KEB", "speakers": ["miroschedji-dr-sania-a-de"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "burghardt-markus", "day" : 29, "start": "11:15", "duration": 60, "room": "Forum", "speakers": ["burghardt-markus"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "martin-andrea", "day" : 29, "start": "11:15", "duration": 60, "room": "KEB", "speakers": ["martin-andrea"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "damme-niek-jan-van", "day" : 29, "start": "13:45", "duration": 60, "room": "Forum", "speakers": ["damme-niek-jan-van"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "schwenker-prof-dr-burkhard", "day" : 29, "start": "15:00", "duration": 60, "room": "Forum", "speakers": ["schwenker-prof-dr-burkhard"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "auschel-roland", "day" : 29, "start": "15:00", "duration": 60, "room": "KEB", "speakers": ["auschel-roland"], "alert": "", "title": "", "info": ""},
            {"type": "panel", "id": "finance-panel", "day" : 29, "start": "16:15", "duration": 90, "room": "Forum", "speakers": ["schafer-daniel", "dombret-prof-dr-andreas", "karapanza-prof-rasa", "fink-wolfgang"], "alert": "", "title": "Finance Panel", "info":"Lorem ipsum dolor sit amet"},
            {"type": "speech", "id": "welbers-dr-georg", "day" : 29, "start": "16:15", "duration": 60, "room": "KEB", "speakers": ["welbers-dr-georg"], "alert": "", "title": "", "info": ""},

            {"type": "speech", "id": "kohr-dr-jurgen", "day" : 30, "start": "10:00", "duration": 60, "room": "KEB", "speakers": ["kohr-dr-jurgen"], "alert": "", "title": "", "info": ""},
            {"type": "panel", "id": "sustainability-panel", "day" : 30, "start": "11:15", "duration": 60, "room": "Forum", "speakers": ["anonymous", "steilemann-dr-markus", "kopp-matthias", "hartmann-dr-julia"], "alert": "", "title": "Sustainability", "info":"Lorem ipsum dolor sit amet"},
            {"type": "speech", "id": "holzer-peter", "day" : 30, "start": "11:15", "duration": 60, "room": "KEB", "speakers": ["holzer-peter"], "alert": "", "title": "Courage needs a voice", "info": ""},

            {"type": "duel", "id": "banking-fintech", "day" : 30, "start": "13:15", "duration": 60, "room": "KEB", "speakers": ["wintels-stefan", "kolzer-carlo"], "alert": "", "title": "Banking and Fintech", "info": ""},
            {"type": "speech", "id": "stadeler-christoph", "day" : 30, "start": "14:30", "duration": 60, "room": "Forum", "speakers": ["stadeler-christoph"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "klug-harald", "day" : 30, "start": "14:30", "duration": 60, "room": "Forum", "speakers": ["klug-harald"], "alert": "", "title": "", "info": ""},
            {"type": "panel", "id": "ai-panel", "day" : 30, "start": "15:45", "duration": 90, "room": "Forum", "speakers": ["stadeler-christoph", "baier-moritz", "darius-volker", "afzai-muhammad-zeshan", "schellenberg-daniel"], "alert": "", "title": "AI / Digital Revolution", "info":"Lorem ipsum dolor sit amet"},
            {"type": "speech", "id": "closing", "day" : 30, "start": "17:30", "duration": 30, "room": "Forum", "speakers": ["anonymous"], "alert": "", "title": "Closing speech", "info": ""},
            
            
            {"type": "generic", "id": "reception", "day" : 28, "start": "16:30", "duration": 30, "room": "Forum", "title": "Champagne Reception", "speakers": [], "alert": ""},
            {"type": "generic", "id": "breakfast-29", "day" : 29, "start": "09:00", "duration": 60, "room": "Forum", "title": "Breakfast", "speakers": [], "alert": ""},
            {"type": "generic", "id": "breakfast-30", "day" : 30, "start": "09:00", "duration": 60, "room": "Forum", "title": "Breakfast", "speakers": [], "alert": ""},
            {"type": "generic", "id": "lunch-29", "day" : 29, "start": "12:30", "duration": 60, "room": "Forum", "title": "Lunch", "speakers": [], "alert": ""},
            {"type": "generic", "id": "lunch-30", "day" : 30, "start": "12:30", "duration": 60, "room": "Forum", "title": "Lunch", "speakers": [], "alert": ""},
            {"type": "generic", "id": "dinner-28", "day" : 28, "start": "20:00", "duration": 120, "room": "Forum", "title": "Dinner", "speakers": [], "alert": ""},
            {"type": "generic", "id": "dinner-29", "day" : 29, "start": "20:00", "duration": 120, "room": "Forum", "title": "Dinner", "speakers": [], "alert": ""},
            {"type": "generic", "id": "dinner-30", "day" : 30, "start": "18:00", "duration": 120, "room": "Forum", "title": "Show Cooking", "speakers": [], "alert": ""},
            {"type": "generic", "id": "party", "day" : 30, "start": "20:00", "duration": 120, "room": "Forum", "title": "Party", "speakers": [], "alert": ""}
        ],
        "invites": [
            {"type": "workshop", "id": "telekom-ws", "day" : 28, "start": "17:00", "duration": 60, "room": "Forum", "speakers": [], "alert": "", "title": "Telekom", "info": ""},
            {"type": "workshop", "id": "ibm-ws", "day" : 28, "start": "17:00", "duration": 60, "room": "Forum", "speakers": [], "alert": "", "title": "IBM", "info": ""},
            {"type": "interview", "id": "telekom-iv", "day" : 28, "start": "", "duration": 60, "room": "Forum", "speakers": [], "alert": "", "title": "Telekom", "info": ""},
            {"type": "interview", "id": "bahlsen-iv", "day" : 28, "start": "", "duration": 60, "room": "Forum", "speakers": [], "alert": "", "title": "Bahlsen", "info": ""},
            {"type": "interview", "id": "pwc-iv", "day" : 29, "start": "", "duration": 60, "room": "Forum", "speakers": [], "alert": "", "title": "PWC", "info": ""}
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
            if (ctrl.defaultData.meta.apiv == incomingData.meta.apiv && ctrl.$storage.data.meta.ts <= incomingData.meta.ts) {
                return true;
            }
        } 
        return false;
    }
   
    if (!this.$storage.data || this.isCurrentData(this.defaultData)) {
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
            if (value && value !== true) concat += '_'+value;
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
