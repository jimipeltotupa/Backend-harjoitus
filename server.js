//Toimii, serverin käynnistys samassa kansiossa node './server.js', pysäytys ctrl+c

// Ota mongoose käyttöön -> tietokantayhteys
const mongoose = require('mongoose');

// Ota express käyttöön
const express =  require('express');
const app = express();

//Ota books käyttöön
const recipe = require('./recipeSchema.js');

//Ota bodyparser käyttöön lomakkeen käsittelyä varten
const bodyparser = require('body-parser');

//Ota mongodb käyttöön
const mongodb = require('mongodb');

// Aseta määritykset express-palvelimelle
    //Ota käyttöön public-tiedosto
app.use(express.static('public'));
    //Ota käyttöön bodyparser
app.use(bodyparser.urlencoded({extended:false}));
// Luo vakio connectionstringille
const uri = "mongodb+srv://jimipeltotupa:Seinajoki0712%21@cluster0.bltn9is.mongodb.net/Ruokareseptit?retryWrites=true&w=majority";
// Muodostetaan yhteys tietokantaan
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser:true})

// Luodaan vakio tietokantayhteydelle
const db = mongoose.connection
// Näytä ilmoitus, jos yhteys ok
db.once('open', function() {
    console.log('Tietokantayhteys avattu');
})

// Kirjoita get-funktio, req.query toimii nyt
app.get('/Reseptit', function(req,res) {
    // Hae reseptit tietokannasta
    recipe.find(req.query, function( err, result) { //tyhjät {} hakuehdossa tuo kaikki, req.query rajaa hakua
        if (err) {
            res.send(err)
        } else {
            res.send(result);0
        }
    })
    })

// Kirjan lisäys post-funktio
app.post('/newRecipe', function (req, res) {
    //console.log(req.body)
    //Varmistetaan, ettei ole ID:tä ja poistetaan jos on.
    delete req.body._id; 
    //Lisätään collectioniin uusi resepti
    db.collection('Reseptit').insertOne(req.body);
    res.send('Recipe added with following data: ' + JSON.stringify(req.body)); //req.body on JSON-objekti, joten muutetaan se Stringiksi ennen palautusta.
})

// Poistofunktio
app.post('/deleteRecipe', function (req, res) {
    //Poistetaan collectionista kirja
    db.collection('Reseptit').deleteOne( { _id: new mongodb.ObjectId(req.body._id)}, function( err, result){
        if ( err ) {
            res.send('Error deleting with floowing data: ' + err);
        } else {
            res.send('Book is deleted with following id: ' + req.body._id);
        }
    });
   
})

// Päivitysfunktio
app.post('/updateREcipe', function(req,res){
    //Päivitetän collectionista kirja. Kolme parametria: ID, mitä päivitetään ja funktio virheenkäsittelyyn ja palautteeseen.
    db.collection('Reseptit').updateOne({_id: new mongodb.ObjectId(req.body._id)},{$set:{title:req.body.title, author:req.body.author, publisher:req.body.publisher}},function(err,results){
        if ( err ) {
            res.send('Error updating: ' + err);
        } else {
            res.send('Recipe updated with following id: ' + req.body._id + ' and following data: ' + JSON.stringify(req.body) );
        }
    });
   
})


// Laitetaan palvelin kuuntelemaan porttia 8080
const server = app.listen(8080, function(){})

//Huom! Selaimessa localhost:8080/books