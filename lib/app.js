/*
A simple command line application that consumes a Public API using a HTTP client library.
*/
var http = require("http");
var url = "http://numbersapi.com/random/math?json";
var prompt = require('prompt');

var ans;

//Get user input for confirmation to 
console.log('Enter yes(y) or no(n) to receive math fact\n');
prompt.get('confirm',function (err,result) {
	 if (err) { return onErr(err); }
	 
	 ans = result.confirm;
     getRandomMathFact();

});


        
// get is a simple wrapper for request()
// which sets the http method to GET
function getRandomMathFact(){
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
        if (err) { return onErr(err); }
        data = JSON.parse(buffer);
        text = data.text;
        number = data.number;

        // extract the the number and text to reveal the math fact
        if(ans.toLowerCase().trim() === 'yes'||ans.toLowerCase().trim() ==='y')         
        {console.log("\t\t"+number+"\nMATH FACT: \t"+text)}
    	else if(ans.toLowerCase().trim() ==='no'||ans.toLowerCase().trim() ==='n')
    		{console.log("Nope we will still give you a math fact whether you like or not");
    		console.log("\t\t"+number+"\nMATH FACT: \t"+text);}
       	else {console.log("Please enter yes(y) or no(n)")}
    }); 
});
}

function onErr(err) {
    console.log(err);
    return 1;
  }