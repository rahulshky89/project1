const mongoose=require("mongoose");
const property = require("../models/propertySchema.js");
const properties = require("./data.js");



async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/myDB");
}
main().then(function(){
    console.log("database is started---");
});

async function addData(){
    await property.deleteMany({});
  let result=  await property.insertMany(properties);

console.log("data is succesfully stored");
};

addData();

