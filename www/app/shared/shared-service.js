"use strict";

angular.module("ngapp").service("shared", function(){ 

    var ctrl = this;

    this.speakers = [{"id":"roland-auschel","name":"Roland Auschel","desc":"Member of Management Board \/\/ Adidas"},{"id":"moritz-baier","name":"Moritz Baier","desc":"Associate \/\/ Forbes 30 under 30, Goldman Sachs"},{"id":"prof-dr-andreas-dombret","name":"Prof. Dr. Andreas Dombret","desc":"Member of Management Board \/\/ Bundesbank"},{"id":"peter-holzer","name":"Peter Holzer","desc":"Keynote Speaker, Executive Coach, Consultant"},{"id":"prof-rasa-karapanza","name":"Prof. Rasa Karapanza","desc":"Professor of Finance \/\/ EBS"},{"id":"matthias-kopp","name":"Matthias Kopp","desc":"Head Low Carbon Business and Finance Sector \/\/ WWF"},{"id":"carsten-kratz","name":"Carsten Kratz","desc":"Head of the Management Team \/\/ BCG Germany & Austria"},{"id":"alena-kretzberg","name":"Alena Kretzberg","desc":"Partner \/\/ McKinsey "},{"id":"andrea-martin","name":"Andrea Martin","desc":"CTO \/\/ IBM Germany"},{"id":"daniel-schellenberg","name":"Daniel Schellenberg","desc":"Vice President \/\/ IDEE GmbH"},{"id":"dr-stefan-schulte","name":"Dr. Stefan Schulte","desc":"CEO \/\/ Fraport"},{"id":"prof-dr-burkhard-schwenker","name":"Prof. Dr. Burkhard Schwenker","desc":"Chairman of the Advisory Council \/\/ Roland Berger"},{"id":"dr-markus-steilemann","name":"Dr. Markus Steilemann","desc":"Member of Management Board, Innovation \/\/ Covestro"},{"id":"dr-georg-welbers","name":"Dr. Georg Welbers","desc":"Member of Management Board \/\/ Thomas Cook"}];
    this.partners = [{"id":"4c","name":"4C"},{"id":"accenture","name":"accenture"},{"id":"bahlsen","name":"Bahlsen"},{"id":"bcg-boston-consulting-group","name":"BCG Boston Consulting Group"},{"id":"bearingpoint","name":"BearingPoint"},{"id":"capgemini-consulting","name":"Capgemini Consulting"},{"id":"citi","name":"Citi"},{"id":"commerz-real","name":"Commerz Real"},{"id":"kloeckner-co","name":"Kl\u00f6ckner &#038; Co"},{"id":"kpmg","name":"KPMG"},{"id":"mckinseycompany","name":"McKinsey&#038;Company"},{"id":"mlp","name":"MLP"},{"id":"porsche-consulting","name":"Porsche Consulting"},{"id":"pwc","name":"pwc"},{"id":"roland-berger","name":"Roland Berger"},{"id":"rothschild","name":"Rothschild"},{"id":"volkswagen-consulting","name":"Volkswagen Consulting"},{"id":"zeb","name":"zeb"}];

   
    this.storage = window.localStorage;
    if (!this.storage.getItem("settings")) this.storage.setItem("settings", '{"starredEvents":{}}');
    this.settings = JSON.parse(this.storage.getItem("settings")); 

console.log('sdofh');
    console.log(this.settings);
    
    this.persist = function() {
        console.log(ctrl.settings);
        ctrl.storage.setItem("settings", JSON.stringify(ctrl.settings));
    }
    
});
