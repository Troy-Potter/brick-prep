var express = require('express');
var router = express.Router();


var searchSku = "46810"; //food sku

// var searchSku = "240867"; //beer sku
router.get('/test', function(req, res) {  
  // var url = "https://api.wegmans.io/products/barcodes/3400004025?api-version=2018-10-18?subscription-key=4b427ba642974d3aa3db4ead59606761"
  var options = {
    'method': 'GET',
    'url': `https://api.wegmans.io/products/${searchSku}?api-version=2018-10-18&Subscription-Key=d6cdec8e3c66405a830ba90e8a6f321a`,
    //'url': `https://api.wegmans.io/products/${searchSku}?api-version=2018-10-18&Subscription-Key=d6cdec8e3c66405a830ba90e8a6f321a`,  
    'headers': {
      }
    
  };
  
  var data = request.get(options).on('response', function(response) {
    response.setEncoding('utf8')
    response.on("data", (chunk) => {
      console.log(chunk)
      var jsonChunk = JSON.parse(chunk); //parsing the chunk to json
      for (key in jsonChunk){ //looping through json
            console.log(key)
            if(key.indexOf("sku") != -1){
                console.log(jsonChunk[key])
                break
            }
        
      }
      
    }).pipe(res);
  });
    console.log()
});


module.exports = router;
