/* test comment */
var fs = require("fs");
var Q = require('q');
var request = require('request');
var cheerio = require('cheerio');

var fileName = "inputfile.html";
var apiKey = 'USE_YOUR_GOOGLE_API_KEY';
var googleTranslate = require('google-translate')(apiKey);

fs.exists(fileName, function(exists) {
  if (exists) {
    fs.stat(fileName, function(error, stats) {
      fs.open(fileName, "r", function(error, fd) {
        var buffer = new Buffer(stats.size);
 
        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
              var data = buffer.toString("utf8", 0, buffer.length);
              var $ = cheerio.load(data);

              var replacnodelength = $('.replaceble').length;

              function asyncFileParsing(){
                    var deferred = Q.defer();

                    $('.replaceble').each(function(i, element){
                        var _self = $(this);
                        googleTranslate.translate($(this).text(), 'es', function(err, translation) {

                          //console.log(translation);

                          _self.text(translation.translatedText);

                          if(i == replacnodelength - 1){
                            console.log('Number of nodes translated: ' + i);

                            var obj = {};
                            obj["content"] = $.html().toString();

                            deferred.resolve(obj);
                          }
                        });
                     });
                     return deferred.promise;
              }

              function CreateTranslatedFile(callbackdata){
                  console.log('I am now in Write File');

                  var newFileContent = callbackdata.content;

                  fs.writeFile('output.html', newFileContent ,
                      function(err) {
                      if(err) {
                        console.log(err);
                      } else {
                        console.log("The file was saved!");
                      }
                  });
                  fs.close(fd);
              }

              asyncFileParsing().then(CreateTranslatedFile);
        });
      });
    });
  }else{
      console.log('error')
  }
}
);
