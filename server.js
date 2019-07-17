
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));

require('./routes')(app);

app.listen(8000, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("listening on port 8000")
    }
})
