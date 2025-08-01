const mongoose = require("mongoose");
const initdata =  require("./data.js");
const Listing = require("../models/listings");

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

// initalizing the data 

const initdb =  async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"687fd32bbf8eb0e93a3db37d"}));
    await Listing.insertMany(initdata.data);
    console.log("data is initalized");
}

initdb();






