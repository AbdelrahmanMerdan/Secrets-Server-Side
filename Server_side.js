// Express
var express = require('express');
var app = express();
app.use(express.static('public'));
const port = process.env.PORT || 2000


// mongodb connection
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Bodo:Bodo0101@cluster0.ph9lr1p.mongodb.net/?retryWrites=true&w=majority" 
const client = new MongoClient(uri)

//host listening
app.listen(port,  () => console.log("Server is running! (listening on port " +  port) )



// This shouldnt be needed anymore
var users = {
    "user1" : {
        "Username" : "user1" ,
        "Password" : "1234",
        "Journal_Entrys" : [],
        "Reminders": [],
        "Settings" : ["lightgray", "#CE7777", "#2B3A55"],
        "Profilepic" : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
    }
              
}



//Normally this is empty and it gets replaced by the user logging in , but for now we populate it
var user = users.user1



app.use(express.static("Combine"))

//add

app.get('/hello' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    res.send('hello')

    
   
})









function removejournal(){
    client.db("Secrets").collection("Users").updateOne({Username: user.Username}, {$set: {"Journal_Entrys": user.Journal_Entrys}})
    .then(console.log("Changed"))
    }



    
