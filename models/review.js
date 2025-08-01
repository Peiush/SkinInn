const mongoose =  require("mongoose");

const reviewSchema = new mongoose.Schema({

    rating : {
        type : Number,
        require : true ,
        min : 1 ,
        max : 5 
    },

    comment : {
        type : String ,
        require : true 
    },

    createdAt : {
        type : Date ,
        default : Date.now
    },

    author: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
})

const Review = mongoose.model("Review",reviewSchema);

module.exports = Review;