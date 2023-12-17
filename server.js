// Ota mongoose käyttöön -> tietokantayhteys
const mongoose = require('mongoose');

// Ota express käyttöön
const express = require('express');
const app = express();

// Ota resepti-schema käyttöön
const recipe = require('./recipeSchema.js');

// Ota bodyparser käyttöön lomakkeen käsittelyä varten
const bodyparser = require('body-parser');

// Ota mongodb käyttöön
const mongodb = require('mongodb');

// Aseta määritykset express-palvelimelle
// Ota käyttöön public-tiedosto
app.use(express.static('public'));
// Ota käyttöön bodyparser
app.use(bodyparser.urlencoded({ extended: false }));

// Luo vakio connectionstringille
const uri = "mongodb+srv://jimipeltotupa:Seinajoki0712%21@cluster0.bltn9is.mongodb.net/Ruokareseptit?retryWrites=true&w=majority";

// Muodostetaan yhteys tietokantaan
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

// Luodaan vakio tietokantayhteydelle
const db = mongoose.connection;

// Näytä ilmoitus, jos yhteys ok
db.once('open', function () {
    console.log('Tietokantayhteys avattu');
});

// Kirjoita get-funktio reseptien hakemiseksi
app.get('/reseptit', function (req, res) {
    // Hae reseptit tietokannasta
    recipe.find(req.query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

// Reseptin lisäys post-funktio
app.post('/newRecipe', function (req, res) {
    // Varmista, ettei ole ID:tä ja poista se, jos on
    delete req.body._id;
    // Lisää collectioniin uusi resepti
    db.collection('Reseptit').insertOne(req.body);
    res.send('Recipe added with following data: ' + JSON.stringify(req.body));
});

// Poistofunktio
app.post('/deleteRecipe', function (req, res) {
    // Poistetaan collectionista resepti
    db.collection('Reseptit').deleteOne({ _id: new mongodb.ObjectId(req.body._id) }, function (err, result) {
        if (err) {
            res.send('Error deleting with following data: ' + err);
        } else {
            res.send('Recipe is deleted with following id: ' + req.body._id);
        }
    });
});

// Päivitysfunktio
app.post('/updateRecipe', function (req, res) {
    // Päivitetään collectionista resepti. Kolme parametria: ID, mitä päivitetään ja funktio virheenkäsittelyyn ja palautteeseen.
    db.collection('Reseptit').updateOne(
        { _id: new mongodb.ObjectId(req.body._id) },
        { $set: { nimi: req.body.nimi, ruokalaji: req.body.ruokalaji, valmistusaika: req.body.valmistusaika } },
        function (err, results) {
            if (err) {
                res.send('Error updating: ' + err);
            } else {
                res.send('Recipe is updated with following id: ' + req.body._id + ' and following data: ' + JSON.stringify(req.body));
            }
        }
    );
});

// Laitetaan palvelin kuuntelemaan porttia 8080
const server = app.listen(8080, function () {
    console.log('Palvelin käynnissä portissa 8080');
});
