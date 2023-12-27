const express = require('express'); 

const port = 8000;

const app = express();

const db = require('./config/db');

const path = require('path');

app.set('view engine','ejs');

app.use(express.urlencoded());

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/',require('./routes/indexRoutes'));


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log(`server is start on port :- ${port}`);
})