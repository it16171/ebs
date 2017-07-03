"use strict";

angular.module("ngapp").service("shared", function($http){ 

    var ctrl = this;

    this.updateRequired = false;
    this.appv = 1;
    this.data = {
        "meta" : {"ts" : 100, "appv" : this.appv, "apiv": 1},
        "speakers" : [{"id":"roland-auschel","name":"Roland Auschel","desc":"Member of Management Board \/\/ Adidas"},{"id":"moritz-baier","name":"Moritz Baier","desc":"Associate \/\/ Forbes 30 under 30, Goldman Sachs"},{"id":"prof-dr-andreas-dombret","name":"Prof. Dr. Andreas Dombret","desc":"Member of Management Board \/\/ Bundesbank"},{"id":"peter-holzer","name":"Peter Holzer","desc":"Keynote Speaker, Executive Coach, Consultant"},{"id":"prof-rasa-karapanza","name":"Prof. Rasa Karapanza","desc":"Professor of Finance \/\/ EBS"},{"id":"matthias-kopp","name":"Matthias Kopp","desc":"Head Low Carbon Business and Finance Sector \/\/ WWF"},{"id":"carsten-kratz","name":"Carsten Kratz","desc":"Head of the Management Team \/\/ BCG Germany & Austria"},{"id":"alena-kretzberg","name":"Alena Kretzberg","desc":"Partner \/\/ McKinsey "},{"id":"andrea-martin","name":"Andrea Martin","desc":"CTO \/\/ IBM Germany"},{"id":"daniel-schellenberg","name":"Daniel Schellenberg","desc":"Vice President \/\/ IDEE GmbH"},{"id":"dr-stefan-schulte","name":"Dr. Stefan Schulte","desc":"CEO \/\/ Fraport"},{"id":"prof-dr-burkhard-schwenker","name":"Prof. Dr. Burkhard Schwenker","desc":"Chairman of the Advisory Council \/\/ Roland Berger"},{"id":"dr-markus-steilemann","name":"Dr. Markus Steilemann","desc":"Member of Management Board, Innovation \/\/ Covestro"},{"id":"dr-georg-welbers","name":"Dr. Georg Welbers","desc":"Member of Management Board \/\/ Thomas Cook"}],
        "partners" : [{"id":"4c","name":"4C"},{"id":"accenture","name":"accenture"},{"id":"bahlsen","name":"Bahlsen"},{"id":"bcg-boston-consulting-group","name":"BCG Boston Consulting Group"},{"id":"bearingpoint","name":"BearingPoint"},{"id":"capgemini-consulting","name":"Capgemini Consulting"},{"id":"citi","name":"Citi"},{"id":"commerz-real","name":"Commerz Real"},{"id":"kloeckner-co","name":"Kl\u00f6ckner &#038; Co"},{"id":"kpmg","name":"KPMG"},{"id":"mckinseycompany","name":"McKinsey&#038;Company"},{"id":"mlp","name":"MLP"},{"id":"porsche-consulting","name":"Porsche Consulting"},{"id":"pwc","name":"pwc"},{"id":"roland-berger","name":"Roland Berger"},{"id":"rothschild","name":"Rothschild"},{"id":"volkswagen-consulting","name":"Volkswagen Consulting"},{"id":"zeb","name":"zeb"}],
        "schedule" : [
            {"id": 1, "day" : 28, "time": "10:00-11:30", "title": "How to save the planet", "speakerId": "moritz-baier", "alert": ""},
            {"id": 2, "day" : 28, "time": "10:00-11:30", "title": "A generic speech", "speakerId": "roland-auschel", "alert": ""},
            {"id": 3, "day" : 29, "time": "10:00-11:30", "title": "How to succeed in life", "speakerId": "prof-dr-andreas-dombret", "alert": ""},
            {"id": 4, "day" : 30, "time": "10:00-11:30", "title": "What to do next", "speakerId": "roland-auschel", "alert": ""}
        ],
        "pickupLocations" : [
            {"id": "oestrich-winkel-bhf", "lat": 50.002455, "lon" : 8.019080, name: "Oestrich-Winkel Bhf"},
            {"id": "eltville-bhf", "lat": 50.027414, "lon" : 8.121395, name: "Eltville Bhf"}
        ]
    };

    this.storage = window.localStorage;
    if (!this.storage.getItem("settings")) this.storage.setItem("settings", '{"starredEvents":{}}');
    this.settings = JSON.parse(this.storage.getItem("settings")); 

    this.getSpeakerById = function(speakerId) {
        for (var i=0;i<ctrl.data.speakers.length;i++) {
            if (ctrl.data.speakers[i].id == speakerId) return ctrl.data.speakers[i];
        }
        return null;
    }
    
    this.persist = function() {
        console.log(ctrl.settings);
        ctrl.storage.setItem("settings", JSON.stringify(ctrl.settings));
    }

    this.isCurrentData = function(localData) {
        if (localData && localData.meta) {
            if(ctrl.appv < localData.meta.appv) this.updateRequired = true;
            else this.updateRequired = false;
            if (localData && localData.meta && ctrl.data.meta.apiv == localData.meta.apiv && ctrl.data.meta.ts < localData.meta.ts) {
                return true;
            }
        } 
        return false;
    }
   
    var localData = this.storage.getItem("data") ? JSON.parse(this.storage.getItem("data")) : null;
    if (ctrl.isCurrentData(localData)) {
        ctrl.data = localData;
    }
    
    $http.get('https://ebs.api.nubenum.de/v1/data.json?appv='+ctrl.appv)
    .then(function(response) {
        if (ctrl.isCurrentData(response.data)) {
            ctrl.data = response.data;
            ctrl.storage.setItem("data", JSON.stringify(response.data));
            console.log(ctrl.data);
        }
    });  

    
    
});
