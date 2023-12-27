const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/mvccrud');


const db = mongoose.connection;

db.on("connected",(err)=>{
    if(err){
        console.log("DB is not connected");
        return false;
    }
    console.log("DB is connected");
})

module.exports = db;