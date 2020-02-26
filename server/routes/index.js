var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});
var request = require('request');
var client = require('../utils/mongoUtil').client
const db =  require('../utils/mongoUtil').db
const {
  AnonymousCredential
} = require('mongodb-stitch-server-sdk');


 /* GET users listing. */
 router.get('/diet/:meal/:name', async function(req, res, next) {
   var meal = req.params.meal
   var name = req.params.name
   meal = meal.substr(0,1).toUpperCase() + meal.substr(1,meal.length-1)
   name = name.substr(0,1).toUpperCase() + name.substr(1,name.length-1)
   console.log(meal + name)
   client.auth.loginWithCredential(new AnonymousCredential()).then( async user => {
     console.log(`logged in anonymously as user ${user.id}`)
     // var test = await db.collection.find({"omnivore":0}).pretty()
     // var omniRecipe = 
     var recipeCollection =  db.collection('recipe')
     var dietCollection =  db.collection('diets')
     // var test=await (dietCollection.findOne({Dinner:Array}))
     // var test=await (dietCollection.findOne({Dinner:Array}))
     var test=await dietCollection.find({

       $and:[{'Name':name},{[meal]:{$exists:true}}]


       
      }
       
      
       )
     var recipe = await recipeCollection.findOne({_id: "Grilled Lobster"})
     test = await test.asArray()
  
     res.send(test)
   });
   client.close();
 });

 
 /*GET users listing. */
 router.get('/recipe/:_id', async function(req, res, next) {
   var oid = ObjectID(req.params._id)
   client.auth.loginWithCredential(new AnonymousCredential()).then( async user => {
     console.log(`logged in anonymously as user ${user.id}`)
     // var test = await db.collection.find({"omnivore":0}).pretty()
     // var omniRecipe = 
     var recipeCollection =  db.collection('recipe')
     var dietCollection =  db.collection('diets')
     // var test=await (dietCollection.findOne({Dinner:Array}))
     // var test=await (dietCollection.findOne({Dinner:Array}))
     var test=await recipeCollection.findOne({_id : oid})

     console.log(test)
       
    //  var recipe = await recipeCollection.findOne({_id: "Grilled Lobster"})
  
     res.send(test)
   });
   client.close();

 });
module.exports = router;
