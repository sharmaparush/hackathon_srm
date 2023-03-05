const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1/hackhound');
const db=mongoose.connection;
db.on('error',function(err){console.log('error connecting to db')});
db.once('open',function(){
    console.log("succesfully connected to the databse");
});