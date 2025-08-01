
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const app =  express();
const mongoose = require("mongoose");
const Listing =  require("./models/listings.js");
const path =  require("path");
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync  = require("./utils/wrapAsync.js");
const Review = require("./models/review.js");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash  = require("connect-flash");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Cart = require("./models/cart.js");
const multer = require("multer");
const {storage} = require("./cloudConfig.js");
const upload = multer({ storage }); // Set up multer for file uploads



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended : true}));
app.use(methodoverride("_method"));
app.engine("ejs",ejsmate);



const sessionOpt = {
    secret : "thissholudbesecret",
    resave : false ,
    saveUninitialized : true,
    cookie : {
        httpOnly : true ,
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000 
    }
}

app.use(session(sessionOpt));
app.use(flash());

/// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/// mongoose connection 

main()
.then((res)=>{
    console.log("mongoose is connected")
})
.catch((err)=>{
    console.log("error",err)
});


 async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/skincare');
}

app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currentUser = req.user; // Make currentUser available in all templates
    next();
})


// REST API routes 

// index route 
app.get("/listings/home",(req,res)=>{
    res.render("listings/home.ejs");
});

/// get route for all listings
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

////// new route 

/// route for adding new listing
app.get("/listings/new",(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You need to be logged in to add a listing")
        return res.redirect("/login");
    }
    res.render("listings/new.ejs")
})

/// route for adding the from data to database

app.post("/listings",upload.single('image'),async(req,res)=>{
    let url = req.file.path; // Get the URL of the uploaded image
    let filename = req.file.filename; // Get the filename of the uploaded image
    const {name,brand,description,price,image,category,whatMakesItPotent,skinType,skinConcern,keyIngredients,productFormat, volume } = req.body
    const newlisting =  new Listing({
        name : name ,
        brand : brand ,
        description : description ,
        price :  price ,
        image : image ,
        whatMakesItPotent : whatMakesItPotent, 
        category : category ,
        skinType : skinType ,
        skinConcern : skinConcern ,
        keyIngredients : keyIngredients ,
        productFormat : productFormat ,
        volume : volume,
    })
    newlisting.image = {url,filename}; // Set the image field with the uploaded file's URL and filename
    newlisting.owner = req.user._id; // Set the owner to the current user 
    console.log(newlisting);
    await newlisting.save()
    .then(()=>{
        console.log("listing saved")
    })
    .catch((err)=>{
        console.log(err);
    });
    req.flash("success","Product is Now Ready to Sell")
    res.redirect("/listings");
    
})


// //listingcshema testing route 

// app.get("/testinglisting",async(req,res)=>{
//     let newlisting =  new Listing({
//         name : "Salicylic Acid Serum",
//         brand : "Ordinary",
//         description : "hepls to remove the sebum that stores on the skin Which result in preventing the Acne",
//         price : 500 ,
//         image : "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494474655/dNGnW442Gs-000000000494474655_1.png",
//         category : "Serum",
//         skinType : "Oily",
//         skinConcern: "Acne",
//         keyIngredients : "Salicylic acid , Benzoly Peroxide",
//         productFormat : "Serum"

//     })
//     await newlisting.save();
//     console.log(newlisting);
//     res.send("success");

// })

// ... your other requires and app setup


// SEARCH ROUTE
app.get("/listings/search", async (req, res) => {
    const { q } = req.query; // Get the search query from the URL (e.g., ?q=sunscreen)

    if (!q) {
        // If the search query is empty, redirect back to the explore page
        return res.redirect("/listings");
    }

    try {
        // Use a regular expression for a case-insensitive search
        const searchRegex = new RegExp(q, 'i');

        const searchResults = await Listing.find({
            $or: [
                { name: searchRegex },
                { brand: searchRegex },
                { category: searchRegex },
                { skinConcern: searchRegex },
                { skinType: searchRegex },
                { productFormat: searchRegex }
            ]
        });

        // Render the main listings page, but pass in the search results
        res.render("listings/index.ejs", { 
            listings: searchResults,
            searchQuery: q // Pass the query to display it on the page
        });

    } catch (error) {
        console.error("Search Error:", error);
        // Handle error, maybe redirect or show an error page
        res.redirect("/listings");
    }
});




/// show route for listings 

app.get("/listings/:id",async(req,res)=>{
    let{id} = req.params
    const listing = await Listing.findById(id).populate({path : "reviews",populate:{ path:"author" }}).populate("owner");
    if(!listing){
        req.flash("error","Listing Not Found")
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
})

/// edit route for listings

app.get("/listings/:id/edit",async(req,res)=>{
    let{id} = req.params;
    let listing =  await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
})

/// post route for edit form 

app.post("/listings/:id",upload.single('image'),async(req,res)=>{
    let{id} = req.params;
    const {name,brand,description,price,image,category,whatMakesItPotent,skinType,skinConcern,keyIngredients,productFormat, volume } = req.body
    const  updatedlisting = ({
        name : name ,
        brand : brand ,
        description : description ,
        price :  price ,
        image : image , 
        category : category ,
        whatMakesItPotent : whatMakesItPotent,
        skinType : skinType ,
        skinConcern : skinConcern ,
        keyIngredients : keyIngredients ,
        productFormat : productFormat ,
        volume : volume,
    })
    await Listing.findByIdAndUpdate(id,updatedlisting)
    if(typeof req.file !== "undefined") {
        let url = req.file.path ;
        let filename = req.file.filename;
        updatedlisting.image = {url,filename}; // setting the image url and filename
        await Listing.findByIdAndUpdate(id,updatedlisting);
         }    
     console.log(updatedlisting);
    req.flash("success","Product Changes Are Saved")
    res.redirect(`/listings/${id}`)
})

/// delete route for listings

app.delete("/listings/:id",async(req,res)=>{
    let{id} = req.params;
    await Listing.findByIdAndDelete(id)
    req.flash("success","Product is Deleted Successfully")
    res.redirect("/listings");
})

// //// RevieSchema tsting 
// app.get("/testingreview",(req,res)=>{
//     let newreview =  new Review({
//         rating : 3 ,
//         comment : "good"
//     })
    
//     newreview.save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

// post route for review 

app.post("/listings/:id/reviews",async (req,res)=>{
    let{id} = req.params;
    let{rating,comment} = req.body;
    let listing = await Listing.findById(id);
    let newreview = new Review ({
        rating : rating, 
        comment : comment 
    })
    newreview.author = req.user._id; // Set the author to the current user
    listing.reviews.push(newreview);
    await newreview.save()
    await listing.save()
    // console.log(listing);
    console.log("reviewsaved");
    req.flash("success","Review Created Successfully")
    res.redirect(`/listings/${id}`)

})

/// delete route for reviews
app.delete("/listings/:id/reviews/:reviewid",async(req,res)=>{
    let{id,reviewid} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewid}})
    await Review.findByIdAndDelete(reviewid);
    req.flash("success","Review Deleted Successfully")
    res.redirect(`/listings/${id}`)
    
})


/// user authentication routes

// app.get("/testinguser",async(req ,res)=>{
//     let newuser = new User({
//         email : "saini@gmail.com",
//         username : "demouser"
//     })
//     await User.register(newuser,"demopassword")
//     .then((user)=>{
//         console.log("user created",user);
//     })
//     .catch((err)=>{
//         console.log("error",err);
//     })
// });

// signup page route 
app.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});

// signup post route
app.post("/signup",async(req,res)=>{
    try {
    const{ username , email , password } = req.body;
    const newuser = new User({ 
        username: username,
        email: email
    })
    let registeredUser = await User.register(newuser,password)
    req.login(registeredUser, (err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        req.flash("success", "Welcome to SkinInn !");
        res.redirect("/listings");
    });

}catch (err) {
        req.flash("error", err.message);
        res.redirect("user/signup");
    }
})

// login page route
app.get("/login",(req,res)=>{
    res.render("user/login.ejs");
});

// login post route 

app.post("/login",passport.authenticate("local",{failureRedirect :"/login", failureFlash : true}),(req,res)=>{
    req.flash("success","Welcome Back")
    console.log(req.user);
    res.redirect("/listings");
}
)
// logout route
app.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log("Error logging out:", err);
            return next(err);
        }
        req.flash("success","Logged Out Successfully")
        res.redirect("/listings");
    })
})

/// cart routes 

/// to get the cart 

app.get("/cart/:currentUserid",(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","You need to be logged in to view your cart")
        return res.redirect("/login");
    }
    Cart.findOne({ user: req.user._id })
        .populate('items.product')
        .then(cart => {
            if (!cart) {
                cart = new Cart({ user: req.user._id, items: [] });
            }
            res.render("cart/show.ejs", { cart });
        })
        .catch(err => {
            console.error("Error fetching cart:", err);
            req.flash("error", "Could not retrieve cart");
            res.redirect("/listings");
        });
});

// Add item to cart (create or update quantity)
app.post('/cart/:currentUserid/items' , async (req, res) => {
    try {
      const { listingId, quantity= 1 } = req.body;
      const product = await Listing.findById(listingId);
  
      let cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }
      else {
        // Filter out items with null product (i.e., product was deleted)
        cart.items = cart.items.filter(item => item.product !== null);
        await cart.save(); // Optional: persist cleanup
      }
  
      // Check if item is already in cart
      const existingItem = cart.items.find(item => item.product.equals(listingId));
  
      if (existingItem) {
        existingItem.quantity += parseInt(quantity);
      } else {
        cart.items.push({ product: listingId, quantity});
      }
  
    await cart.save();
    console.log("Item added to cart:", product.name);
    /// print the item id 
    console.log("Item ID:", listingId);
    console.log("Item Quantity:", quantity);
    console.log("Cart Items:", cart.items._id);
    console.log("Productid:", product._id);

    
      // Redirect to cart page
    req.flash("success", "Item added to cart successfully");    
    res.redirect(`/cart/${req.user._id}`);
    } catch (err) {
        console.error("Error adding item to cart:", err);
        req.flash("error", "Could not add item to cart");
    }
  });

// Remove item from cart
app.delete('/cart/:currentUserid/items/:itemproductid', async (req, res) => {
    try {
        const { itemproductid } = req.params;
        const cart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            { $pull: { items: { product: itemproductid } } },
            { new: true }
        );

        if (!cart) {
            req.flash("error", "Cart not found");
            return res.redirect("/listings");
        }

        console.log("Item removed from cart:", itemproductid);
        req.flash("success", "Item removed from cart successfully");
    } catch (err) {
        console.error("Error removing item from cart:", err);
        req.flash("error", "Could not remove item from cart");
    }
    res.redirect(`/cart/${req.user._id}`);
});

//// remove all items from cart

app.delete('/cart/:currentUserid', async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { user: req.user._id },
            { $set: { items: [] } },
            { new: true }
        );

        if (!cart) {
            req.flash("error", "Cart not found");
            return res.redirect("/listings");
        }

        console.log("All items removed from cart");
        req.flash("success", "All items removed from cart successfully");
    } catch (err) {
        console.error("Error removing all items from cart:", err);
        req.flash("error", "Could not remove all items from cart");
    }
    res.redirect(`/cart/${req.user._id}`);
}
);


//// skinType

app.get("/skinType/oily",async  (req, res) => {
   try{
    let allListings = await Listing.find({ skinType: "Oily" });
    res.render("skinType/oily.ejs", { allListings });
   }
    catch (err) {
          console.error("Error fetching oily listings:", err);
          req.flash("error", "Could not retrieve oily listings");
          res.redirect("/listings");
     }
    
});

app.get("/skinType/dry",async  (req, res) => {
   try{
    let allListings = await Listing.find({ skinType: "Dry" });
    res.render("skinType/dry.ejs", { allListings });
   }
    catch (err) {
          console.error("Error fetching dry listings:", err);
          req.flash("error", "Could not retrieve dry listings");
          res.redirect("/listings");
     }
    
}
);

app.get("/skinType/combination",async  (req, res) => {
   try{
    let allListings = await Listing.find({ skinType: "Combination" });
    res.render("skinType/combination.ejs", { allListings });
   }
    catch (err) {
          console.error("Error fetching combination listings:", err);
          req.flash("error", "Could not retrieve combination listings");
          res.redirect("/listings");
     }
    
}
);

app.get("/skinType/sensitive",async  (req, res) => {
   try{
    let allListings = await Listing.find({ skinType: "Sensitive" });
    res.render("skinType/sensitive.ejs", { allListings });
   }
    catch (err) {
          console.error("Error fetching sensitive listings:", err);
          req.flash("error", "Could not retrieve sensitive listings");
          res.redirect("/listings");
     }
    
} );      


//// routes for skinConcern

app.get("/skinConcern/Wrinkles",async(req,res)=>{
    try {
        let allListings = await Listing.find({ skinConcern: "Fine Lines & Wrinkles" });
        res.render("skinConcern/Wrinkles.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings for Fine Lines & Wrinkles:", err);
        req.flash("error", "Could not retrieve listings for Fine Lines & Wrinkles");
        res.redirect("/listings");
    }
})

app.get("/skinConcern/redness",async(req,res)=>{
    try {
        let allListings = await Listing.find({ skinConcern: "Redness" });
        res.render("skinConcern/redness.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings for Redness:", err);
        req.flash("error", "Could not retrieve listings for Redness");
        res.redirect("/listings");
    }
}
)

app.get("/skinConcern/acne",async(req,res)=>{
    try {
        let allListings = await Listing.find({ skinConcern: "Acne" });
        res.render("skinConcern/acne.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings for Acne:", err);
        req.flash("error", "Could not retrieve listings for Acne");
        res.redirect("/listings");
    }
})

app.get("/skinConcern/Darkcircles",async(req,res)=>{
    try {
        let allListings = await Listing.find({ skinConcern: "Dark Circles" });
        res.render("skinConcern/Darkcircles.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings for Dark Circles:", err);
        req.flash("error", "Could not retrieve listings for Dark Circles");
        res.redirect("/listings");
    }
}
)

app.get("/skinConcern/dullness",async(req,res)=>{
    try {
        let allListings = await Listing.find({ skinConcern: "Dullness" });
        res.render("skinConcern/dullness.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings for Dullness:", err);
        req.flash("error", "Could not retrieve listings for Dullness");
        res.redirect("/listings");
    }
}
)

app.get("/skinConcern/sunProtection",async(req,res)=>{
    try {
        let allListings = await Listing.find({ skinConcern: "Sun Protection" });
        res.render("skinConcern/sunProtection.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings for Sun Protection:", err);
        req.flash("error", "Could not retrieve listings for Sun Protection");
        res.redirect("/listings");
    }
}
)

app.get("/skinConcern/pores",async(req,res)=>{
    try {
        let allListings = await Listing.find({ skinConcern: "Pores" });
        res.render("skinConcern/pores.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings for Pores:", err);
        req.flash("error", "Could not retrieve listings for Pores");
        res.redirect("/listings");
    }
}
)
app.get("/skinConcern/darkSpots",async(req,res)=>{
    try {
        let allListings = await Listing.find({ skinConcern: "Dark Spots" });
        res.render("skinConcern/darkSpots.ejs", { allListings });
    } catch (err) {
        console.error("Error fetching listings for Dark Spots:", err);
        req.flash("error", "Could not retrieve listings for Dark Spots");
        res.redirect("/listings");
    }
}
)


app.use((err,req,res,next)=>{
    let{statusCode , message } = err 
    res.render("listings/error.ejs",{statusCode ,message});
})


app.listen(3000,()=>{
    console.log("port is listining")
})