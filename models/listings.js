const mongoose = require("mongoose");
const Review =  require("./review.js")

const listingSchema = new mongoose.Schema({
  
    name : {
        type : String,
        required : true,
        trim : true ,   
    },

    brand : {
        type : String,
        required : true ,
        trim : true ,
    },

    description : {
        type : String ,
        required : true,
    },

    price : {
        type : Number,
        required : true 
    },

    image : {
        url : String,
        filename : String
    } ,

    category : {
        type : [String] ,
        required : true ,
        enum : ["Cleanser","Toner","Serum","Moisturizer","Sunscreen","Eye Cream","Mask","Exfoliant"]
    },

    skinType : {
        type : [String],
        required : true ,
        enum : ["All skin types","Oily","Dry","Combination","Sensitive","Normal"]
    },
    skinConcern : {
        type : [String] ,
        required : true ,
        enum : ["Acne", "Hyperpigmentation", "Fine Lines & Wrinkles", "Redness", "Dullness", "Dryness","Sun Protection","Pores","Dark Spots","Dark Circles"]
    },

    // keyIngredients : {
    //     type : [String] ,
    //     required : true ,

    // },

    productFormat : {
        type : [String] ,
        enum: ['Cream', 'Serum', 'Gel', 'Lotion', 'Oil', 'Foam', 'Balm',]
    },

    volume : {
        type : Number ,
    },

    whatMakesItPotent : {
        type : String,
        required : true,

    },

    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Review"
    }],

    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
})

listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
        });

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;