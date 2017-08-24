"use strict";

angular.module("ngapp").service("shared", function($http, $localStorage, $mdToast){ 

    var ctrl = this;
    this.$storage = $localStorage;
    if(!this.$storage.settings) this.$storage.settings = {"starredEvents":{}, "ratedSessions":[]};

    this.lastDataUpdate = 0;
    this.apiSrv = 'https://ebs.api.nubenum.de/v1/';
    this.updateRequired = false;
    this.defaultData = { 
        "meta" : {"ts" : 138, "appv" : 1, "apiv": 1}, 
        "shuttleDisabled":false,
        "speakers" : [{"id":"auschel-roland","name":"Roland Auschel","info":"Member of Executive Board, Global Sales","co":"adidas Group","text":"","web":0},{"id":"baier-moritz","name":"Moritz Baier","info":"Associate","co":"Goldman Sachs","text":"","web":0},{"id":"borsch-marc-aurel","name":"Marc-Aurel Boersch","info":"CEO","co":"Nestl\u00e9 Nederland","text":"","web":0},{"id":"burghardt-markus","name":"Markus Burghardt","info":"Global FS Assurance Leader, Member of the Board","co":"PwC","text":"","web":0},{"id":"darius-volker","name":"Volker Darius","info":"Head of Corporate Functions","co":"Capgemini Consulting","text":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. \n\nUt wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. ","web":0},{"id":"de-miroschedji-sania-alexander","name":"Dr. Sania Alexander de Miroschedji","info":"CEO","co":"Volkswagen Consulting","text":"","web":0},{"id":"dombret-andreas","name":"Prof. Dr. Andreas Dombret","info":"Member of Management Board","co":"Bundesbank","text":"","web":0},{"id":"fink-wolfgang","name":"Dr. Wolfgang Fink","info":"Co-CEO","co":"Goldman Sachs","text":"","web":0},{"id":"flathmann-beke","name":"Beke Flathmann","info":"Chairwoman of the 28th EBS Symposium","co":"","text":"","web":0},{"id":"hartmann-julia","name":"Dr. Julia Hartmann","info":"Vice Dean Research","co":"EBS University","text":"","web":0},{"id":"holzer-peter","name":"Peter Holzer","info":"Executive Coach","co":"","text":"","web":0},{"id":"karapandza-rasa","name":"Prof. Rasa Karapandza","info":"Chaired Professor of Finance","co":"EBS University","text":"","web":0},{"id":"kleinpeter-tim","name":"Tim Kleinpeter","info":"Chairman of the 28th EBS Symposium","co":"","text":"","web":0},{"id":"klug-harald","name":"Harald Klug","info":"COO Germany, Austria and Eastern Europe","co":"Blackrock","text":"","web":0},{"id":"kohr-jurgen","name":"Dr. J\u00fcrgen Kohr","info":"COO","co":"Fujitsu Deutschland","text":"","web":0},{"id":"kolzer-carlo","name":"Carlo K\u00f6lzer","info":"Global Head of FX, CEO & Founder","co":"Deutsche B\u00f6rse Group, 360T","text":"","web":0},{"id":"kopp-matthias","name":"Matthias Kopp","info":"Head Low Carbon Business and Finance Sector","co":"WWF","text":"","web":0},{"id":"koth-alexander","name":"Alexander K\u00f6th","info":"Founder & Managing Director","co":"Minodes","text":"","web":0},{"id":"kratz-carsten","name":"Carsten Kratz","info":"Head of the Management Team","co":"BCG Germany & Austria","text":"","web":0},{"id":"kretzberg-alena","name":"Alena Kretzberg","info":"Partner","co":"McKinsey&Company","text":"","web":0},{"id":"martin-andrea","name":"Andrea Martin","info":"CTO","co":"IBM Germany, Austria, CH","text":"","web":0},{"id":"mehl-rainer","name":"Dr. Rainer Mehl","info":"Executive Vice President","co":"Capgemini Consulting","text":"","web":0},{"id":"mulherr-silke","name":"Silke M\u00fclherr","info":"Deputy Head of the Foreign Desk","co":"WeltN24","text":"","web":0},{"id":"schafer-daniel","name":"Daniel Sch\u00e4fer","info":"Finance Editor","co":"Handelsblatt","text":"","web":0},{"id":"schellenberg-daniel","name":"Daniel Schellenberg","info":"Vice President","co":"IDEE GmbH","text":"","web":0},{"id":"schulte-stefan","name":"Dr. Stefan Schulte","info":"CEO","co":"Fraport","text":"","web":0},{"id":"schwenker-burkhard","name":"Prof. Dr. Burkhard Schwenker","info":"Chairman of the Advisory Council","co":"Roland Berger","text":"","web":0},{"id":"stadeler-christoph","name":"Christoph Stadeler","info":"Head of Automotive Strategy","co":"Facebook","text":"","web":0},{"id":"steilemann-markus","name":"Dr. Markus Steilemann","info":"Member of Management Board, Innovation","co":"Covestro","text":"","web":0},{"id":"van-damme-niek-jan","name":"Niek Jan van Damme","info":"Member of Management Board, Managing Director","co":"Deutsche Telekom AG, Telekom Deutschland GmbH","text":"","web":0},{"id":"welbers-georg","name":"Dr. Georg Welbers","info":"Director Omnichannel Marketing, Vertrieb & eCommerce","co":"Thomas Cook AG","text":"","web":0},{"id":"wintels-stefan-b","name":"Stefan B. Wintels","info":"CEO & CCO","co":"Citigroup Global Markets Germany AG","text":"","web":0}],
        "partners" : [{"type":"corporate","id":"accenture","web":0},{"type":"corporate","id":"asiwirtschaftsberatung","web":0},{"type":"corporate","id":"bahlsen","web":0},{"type":"corporate","id":"bcg","web":0},{"type":"corporate","id":"bearingpoint","web":0},{"type":"corporate","id":"c-group","web":0},{"type":"corporate","id":"capgemini-consulting","web":0},{"type":"corporate","id":"citi","web":0},{"type":"corporate","id":"commerz-real","web":0},{"type":"corporate","id":"deloitte","web":0},{"type":"corporate","id":"eandcologo","web":0},{"type":"corporate","id":"insiderstechnologieslogorgbrz","web":0},{"type":"corporate","id":"klocknerco","web":0},{"type":"corporate","id":"kpmg","web":0},{"type":"corporate","id":"mckinsey","web":0},{"type":"corporate","id":"minodes","web":0},{"type":"corporate","id":"mlp","web":0},{"type":"corporate","id":"mmlogo","web":0},{"type":"corporate","id":"perspectives-for-talents","web":0},{"type":"corporate","id":"porsche-consulting","web":0},{"type":"corporate","id":"pwc","web":0},{"type":"corporate","id":"roland-berger-logo","web":0},{"type":"corporate","id":"rothschild","web":0},{"type":"corporate","id":"thomascook","web":0},{"type":"corporate","id":"triuva","web":0},{"type":"corporate","id":"volkswagen-consulting","web":0},{"type":"corporate","id":"zeb","web":0},{"type":"sponsor","id":"ardologo-new-q","web":0},{"type":"sponsor","id":"chialogocmyk","web":0},{"type":"sponsor","id":"dewaterelogo","web":0},{"type":"sponsor","id":"fitvia-logo","web":0},{"type":"sponsor","id":"guampac-","web":0},{"type":"sponsor","id":"hela-logo-rgb","web":0},{"type":"sponsor","id":"icon-logo-","web":0},{"type":"sponsor","id":"image","web":0},{"type":"sponsor","id":"jmsecondaryonorangecmyk","web":0},{"type":"sponsor","id":"kalemelogoblack","web":0},{"type":"sponsor","id":"kalemelogoblacklarge","web":0},{"type":"sponsor","id":"logo","web":0},{"type":"sponsor","id":"logo-gerster-wagneranthrazit","web":0},{"type":"sponsor","id":"logo-x-fuer-druck-mit-inhaber-pw","web":0},{"type":"sponsor","id":"lorenzc","web":0},{"type":"sponsor","id":"lorenzc","web":0},{"type":"sponsor","id":"lschwcsimple","web":0},{"type":"sponsor","id":"mymueslilogosrgb","web":0},{"type":"sponsor","id":"nicnacscmyk","web":0},{"type":"sponsor","id":"proviant-manufaktur-logo","web":0},{"type":"sponsor","id":"rhinoslogotypelandscapec-","web":0},{"type":"sponsor","id":"sflogoclaim-welle-claim-farbig","web":0},{"type":"sponsor","id":"weingut-robert-weil-logo","web":0},{"type":"sponsor","id":"weingut-weillogokopfc","web":0}],
        "schedule" : [
            {"type": "speech", "id": "opening", "day" : 28, "start": "15:00", "duration": 90, "room": "Forum", "speakers": ["flathmann-beke"], "alert": "", "title": "", "info": ""},

            {"type": "speech", "id": "kratz-carsten", "day" : 28, "start": "17:00", "duration": 60, "room": "Forum", "speakers": ["kratz-carsten"], "alert": "", "title": "", "info": ""},
            {"type": "panel", "id": "geopolitics-panel", "day" : 28, "start": "18:15", "duration": 90, "room": "Forum", "speakers": ["koth-alexander", "kownatzki-max", "schulte-stefan", "mulherr-silke" ], "alert": "", "title": "Geopolitics Panel", "info": ""},
        
            {"type": "speech", "id": "kretzberg-alena", "day" : 29, "start": "10:00", "duration": 60, "room": "Forum", "speakers": ["kretzberg-alena"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "miroschedji-dr-sania-a-de", "day" : 29, "start": "10:00", "duration": 60, "room": "KEB", "speakers": ["de-miroschedji-sania-alexander"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "burghardt-markus", "day" : 29, "start": "11:15", "duration": 60, "room": "Forum", "speakers": ["burghardt-markus"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "martin-andrea", "day" : 29, "start": "11:15", "duration": 60, "room": "KEB", "speakers": ["martin-andrea"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "damme-niek-jan-van", "day" : 29, "start": "13:45", "duration": 60, "room": "Forum", "speakers": ["van-damme-niek-jan"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "schwenker-prof-dr-burkhard", "day" : 29, "start": "15:00", "duration": 60, "room": "Forum", "speakers": ["schwenker-burkhard"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "auschel-roland", "day" : 29, "start": "15:00", "duration": 60, "room": "KEB", "speakers": ["auschel-roland"], "alert": "", "title": "", "info": ""},
            {"type": "panel", "id": "finance-panel", "day" : 29, "start": "16:15", "duration": 90, "room": "Forum", "speakers": ["dombret-andreas", "fink-wolfgang", "karapandza-rasa", "schafer-daniel"], "alert": "", "title": "Finance Panel", "info":""},
            {"type": "speech", "id": "welbers-dr-georg", "day" : 29, "start": "16:15", "duration": 60, "room": "KEB", "speakers": ["welbers-georg"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "mehl-rainer", "day" : 29, "start": "18:00", "duration": 60, "room": "Forum", "speakers": ["mehl-rainer"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "borsch-marc-aurel", "day" : 29, "start": "19:15", "duration": 60, "room": "Forum", "speakers": ["borsch-marc-aurel"], "alert": "", "title": "", "info": ""},

            {"type": "speech", "id": "kohr-dr-jurgen", "day" : 30, "start": "10:00", "duration": 60, "room": "KEB", "speakers": ["kohr-jurgen"], "alert": "", "title": "", "info": ""},
            {"type": "panel", "id": "sustainability-panel", "day" : 30, "start": "11:15", "duration": 90, "room": "Forum", "speakers": ["hartmann-julia", "kopp-matthias", "steilemann-markus", "anonymous"], "alert": "", "title": "Sustainability", "info":""},
            {"type": "speech", "id": "holzer-peter", "day" : 30, "start": "11:15", "duration": 60, "room": "KEB", "speakers": ["holzer-peter"], "alert": "", "title": "Courage needs a voice", "info": ""},
            {"type": "duel", "id": "banking-fintech", "day" : 30, "start": "13:15", "duration": 60, "room": "KEB", "speakers": ["wintels-stefan-b", "kolzer-carlo"], "alert": "", "title": "Banking and Fintech", "info": ""},
            {"type": "speech", "id": "stadeler-christoph", "day" : 30, "start": "14:30", "duration": 60, "room": "Forum", "speakers": ["stadeler-christoph"], "alert": "", "title": "", "info": ""},
            {"type": "speech", "id": "klug-harald", "day" : 30, "start": "14:30", "duration": 60, "room": "KEB", "speakers": ["klug-harald"], "alert": "", "title": "", "info": ""},
            {"type": "panel", "id": "ai-panel", "day" : 30, "start": "15:45", "duration": 90, "room": "Forum", "speakers": [ "afzai-muhammad-zeshan", "baier-moritz", "darius-volker", "schellenberg-daniel", "stadeler-christoph"], "alert": "", "title": "AI / Digital Revolution", "info":""},

            {"type": "speech", "id": "closing", "day" : 30, "start": "17:30", "duration": 30, "room": "Forum", "speakers": ["kleinpeter-tim"], "alert": "", "title": "", "info": ""},
            
            
            {"type": "generic", "id": "reception", "day" : 28, "start": "16:30", "duration": 30, "room": "Forum", "speakers": [], "alert": "", "title": "Champagne Reception", "info": ""},
            {"type": "generic", "id": "breakfast-29", "day" : 29, "start": "09:00", "duration": 90, "room": "Dining Hall", "speakers": [], "alert": "", "title": "Breakfast", "info": ""},
            {"type": "generic", "id": "breakfast-30", "day" : 30, "start": "09:00", "duration": 90, "room": "Dining Hall", "speakers": [], "alert": "", "title": "Breakfast", "info": ""},
            {"type": "generic", "id": "lunch-29", "day" : 29, "start": "12:30", "duration": 120, "room": "Dining Hall", "speakers": [], "alert": "", "title": "Lunch", "info": ""},
            {"type": "generic", "id": "lunch-30", "day" : 30, "start": "12:30", "duration": 120, "room": "Dining Hall", "speakers": [], "alert": "", "title": "Lunch", "info": ""},
            {"type": "generic", "id": "dinner-28", "day" : 28, "start": "18:00", "duration": 120, "room": "Dining Hall", "speakers": [], "alert": "", "title": "Dinner", "info": ""},
            {"type": "generic", "id": "dinner-29", "day" : 29, "start": "18:00", "duration": 120, "room": "Dining Hall", "speakers": [], "alert": "", "title": "Dinner", "info": ""},
            {"type": "generic", "id": "dinner-30", "day" : 30, "start": "18:00", "duration": 120, "room": "Dining Hall", "speakers": [], "alert": "", "title": "Dinner with Live Cooking", "info": ""}
        ],
        "invites": [
            {"type": "workshop", "id": "armira-ws", "day" : 28, "start": "16:45", "duration": 300, "room": "K1", "speakers": [], "alert": "", "title": "Armira", "info": ""},

            {"type": "workshop", "id": "roland-berger-ws", "day" : 29, "start": "10:00", "duration": 120, "room": "K1", "speakers": [], "alert": "", "title": "Roland Berger", "info": ""},
            {"type": "workshop", "id": "bcg-ws", "day" : 29, "start": "10:00", "duration": 120, "room": "Max", "speakers": [], "alert": "", "title": "BCG", "info": ""},
            {"type": "workshop", "id": "mckinsey-ws", "day" : 29, "start": "13:30", "duration": 120, "room": "K1", "speakers": [], "alert": "", "title": "McKinsey", "info": ""},
            {"type": "workshop", "id": "bloomberg-ws", "day" : 29, "start": "13:30", "duration": 120, "room": "Audi", "speakers": [], "alert": "", "title": "Bloomberg", "info": ""},
            {"type": "workshop", "id": "pwc-ws", "day" : 29, "start": "15:45", "duration": 180, "room": "K4", "speakers": [], "alert": "", "title": "PwC", "info": ""},
            {"type": "workshop", "id": "capgemini-ws", "day" : 29, "start": "15:45", "duration": 120, "room": "Audi", "speakers": [], "alert": "", "title": "Capgemini", "info": ""},
            {"type": "workshop", "id": "accenture-ws", "day" : 29, "start": "15:45", "duration": 120, "room": "Max", "speakers": [], "alert": "", "title": "Accenture", "info": ""},
            {"type": "workshop", "id": "pupils-ws", "day" : 30, "start": "11:15", "duration": 120, "room": "K1", "speakers": [], "alert": "", "title": "Sch\u00fcler @Symp", "info": ""},
            {"type": "workshop", "id": "futury-ws", "day" : 30, "start": "11:15", "duration": 120, "room": "Audi", "speakers": [], "alert": "", "title": "Futury & Wertestiftung", "info": ""},

            {"type": "interview", "id": "telekom-iv", "day" : 28, "start": "", "duration": 60, "room": "Forum", "speakers": [], "alert": "", "title": "Telekom", "info": ""},
            {"type": "interview", "id": "bahlsen-iv", "day" : 28, "start": "", "duration": 60, "room": "Forum", "speakers": [], "alert": "", "title": "Bahlsen", "info": ""},
            {"type": "interview", "id": "pwc-iv", "day" : 29, "start": "", "duration": 60, "room": "Forum", "speakers": [], "alert": "", "title": "PWC", "info": ""},
            {"type": "interview", "id": "thomas-cook-iv", "day" : 30, "start": "", "duration": 60, "room": "Forum", "speakers": [], "alert": "", "title": "Thomas Cook", "info": ""}
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
        console.log('unique', ctrl.$storage.settings.fcmt);
        return ctrl.$storage.settings.fcmt;
    }

    this.getStarredScheduleString = function() {
        var obj = ctrl.$storage.settings.starredEvents;
        var concat = '';
        angular.forEach(obj, function(value, key) {
            if (value) concat += ','+key;
            if (value && value !== true) concat += '_'+value;
        });
        if (concat.length > 0) concat = concat.substring(1);
        console.log('schedulestring', concat)
        return concat;
    }

    this.updateData = function(force) {
        var d = new Date();
        var diff = d.getTime()-ctrl.lastDataUpdate;
        if (!force && diff < 1000000 || force && diff < 3000) return;
        var apiUrl = ctrl.apiSrv+'data.php';
        apiUrl = ctrl.apiSrv+'data.php?appv='+ctrl.defaultData.meta.appv+'&fcmt='+ctrl.getUniqueToken()+'&reminders='+!!ctrl.$storage.settings.reminders+'&starred='+ctrl.getStarredScheduleString();
        
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
