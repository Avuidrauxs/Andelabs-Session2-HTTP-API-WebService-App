/*
A simple command line application that consumes a Public API using a HTTP client library.
*/
var http = require("http");
    url = "http://numbersapi.com/random/math?json";

// get is a simple wrapper for request()
// which sets the http method to GET
var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "", 
        data,
        number,
        text;

    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        // finished transferring data
        // dump the raw data
        data = JSON.parse(buffer);
        text = data.text;
        number = data.number;

        // extract the the number and text to reveal the math fact
        console.log("\t\t"+number+"\nMATH FACT: \t"+text);
       
    }); 
});