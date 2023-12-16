//Toimii

//Otetaan Mongoose käytöön
const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema;

  let reseptit = new recipeSchema ( {
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
},
  { collection: 'Reseptit'}
)
// Export model, huom! Parametreina kokoelman nimi ja skeeman nimi
module.exports = mongoose.model('Recipe', recipeSchema, 'Reseptit');