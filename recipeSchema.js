const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    nimi: {
        type: String
    },
    ainesosat: {
        type: String
    },
    ohjeet: {
        type: String
    },
    ruokalaji: {
        type: String
    },
    valmistusaika: {
        type: String
    }
}, { collection: 'Reseptit' });

module.exports = mongoose.model('Recipe', recipeSchema, 'Reseptit');
