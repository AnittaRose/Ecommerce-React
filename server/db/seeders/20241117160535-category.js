
const Categories = require("../models/Categories");
'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      return models.Category.insertMany([
        {
          _id : "673a15381f41d34cc2bfca8f",
          Category : "Make up"
        },
        {
          _id : "673a15821f41d34cc2bfca90",
          Category : "Skin care"
        },
        {
          _id : "673a15c21f41d34cc2bfca91",
          Category : "Hair care"
        },
        {
          _id : "673a16141f41d34cc2bfca92",
          Category : "Body care"
        },
        {
          _id : "673a16341f41d34cc2bfca93",
          Category : "Fragrance"
        },
        {
          _id : "6752fe8435d96988a26c79b7",
          Category : "Face care"
        }
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  
  },

  down: (models, mongoose) => {
   
      return models.Category.deleteMany({
        
        _id : {
          $in :[
            "673a15381f41d34cc2bfca8f",
            "673a15821f41d34cc2bfca90",
            "673a15c21f41d34cc2bfca91",
            "673a16141f41d34cc2bfca92",
            "673a16341f41d34cc2bfca93",
            "6752fe8435d96988a26c79b7"
          ]
            
          
        }

      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  }
};
