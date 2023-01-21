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


// Login and Signup
app.post('/login', (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])

    var usern = z["user"]
    var pass = z["pass"]

    const finduser = client.db("Secrets").collection("Users").find({Username: usern})
        .toArray()
        .then((response) => {
            return response
        })

    const checkUsers = () => {
            finduser.then((usersfound) => {
            
                if(usersfound.length == 0){
                    console.log("empty no user with username")
                    var jsontext = JSON.stringify({
                            'action': z['action'],
                            'flag': false,
                        });
                        
                        res.send(jsontext)

                }

                else{
                    if(usersfound[0].Password == pass){
                        user = usersfound[0]
                        console.log(user)
                        var jsontext = JSON.stringify({
                            'action': z['action'],
                            'flag': true,
                    })
                    res.send(jsontext)
                }
                else{
                    var jsontext = JSON.stringify({
                        'action': z['action'],
                        'flag': false,
                })
                console.log("Wrong Pass")
                res.send(jsontext)

                }
                    
                
                }
            })
    }

     checkUsers()
})

app.post('/signup', (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])

    var usern = z["user"]
        var pass = z["pass"]

        const finduser = client.db("Secrets").collection("Users").find({Username: usern})
            .toArray()
            .then((response) => {
                return response
            })

        const addUsers = () => {
            finduser.then((usersfound) => {
            
                if(usersfound.length == 0){
                    console.log("Creating User!")
                    var newuser = {
                                "Username" : usern ,
                                "Password" : pass,
                                "Journal_Entrys" : [],
                                "Reminders": [],
                                "Settings" : ["lightgray", "#CE7777", "#2B3A55"],
                                "Profilepic" : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                            }
                        client.db("Secrets").collection("Users").insertOne(newuser)

                        var jsontext = JSON.stringify({
                            'action': z['action'],
                            'flag': true,
                        });
                        
                        res.send(jsontext)

                }



                else{
                    console.log("already taken")
                    var jsontext = JSON.stringify({
                    'action': z['action'],
                    'flag': false,
                });
                
                res.send(jsontext)
                }
                });
            };

            addUsers()

    

   
})


//Add Journal and Delete it
app.post('/generatejournal' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])

    const finduser = client.db("Secrets").collection("Users").find({Username: user.Username})
    .toArray()
    .then((response) => {
        return response
    })

const addJournal = () => {
    finduser.then((usersfound) => {
        var flag = true
       for(var n in user["Journal_Entrys"]){
    
        if(user["Journal_Entrys"][n][0] == z["entry"][0]){
            
            flag = false                    
        }
    }

        if (flag){
            client.db("Secrets").collection("Users")
            .updateOne({Username:user.Username }, {$push: {Journal_Entrys: z["entry"]}})

            user.Journal_Entrys.push(z["entry"])
            console.log(user)

            var jsontext = JSON.stringify({
            'action': z['action'],
            'flag': flag
            });
            res.send(jsontext)
            
        }
        else{
            var jsontext = JSON.stringify({
                'action': z['action'],
                'flag': flag
                });
                console.log("not updated")
                res.send(jsontext)
        }

            
    })

    
}
addJournal()   
    
    
   
})


app.post('/addjournal' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])   

    var jsontext = JSON.stringify({
        'action': z['action'],
        'journals': user.Journal_Entrys,
    });

    console.log(JSON.parse(jsontext)["action"])
    res.send(jsontext)
   
})

app.post('/deletejournal' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])
    
    for(var n in user["Journal_Entrys"]){
        // console.log(user["Journal_Entrys"][n][0])
        if(user["Journal_Entrys"][n][0] == z["journal"]){
            var tr =user["Journal_Entrys"][n][0] == z["journal"]
            
            user["Journal_Entrys"].splice(n,1)

            console.log(user["Journal_Entrys"])

            removejournal()         
        }
    } 
    
   
})


//Change Username and Password
app.post('/setting' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data']) 
    
    var userset = z["user"]
    var passet = z["pass"]
    
        
        const finduser = client.db("Secrets").collection("Users").find({Username: userset})
            .toArray()
            .then((response) => {
                return response
            })

        const changeuser = () => {
            finduser.then((usersfound) => {
                
                
                if(  ((usersfound.length == 1) && (usersfound[0].Username == user.Username)) || (usersfound.length == 0)){
                    console.log("Changing User!")
                    
                    if(userset != ''){
                        client.db("Secrets").collection("Users").updateOne({Username: user.Username}, {$set: {"Username": userset}})
                            .then(console.log("Changed Username"))
                        
                        user["Username"] = userset 
                    }

                    if(passet != ''){
                        client.db("Secrets").collection("Users").updateOne({Username: user.Username}, {$set: {"Password": passet}})
                            .then(console.log("Changed Password"))
                        user["Password"] = passet 

                    }

                        var jsontext = JSON.stringify({
                            'action': z['action'],
                            'flag': true,
                        });
                        
                        res.send(jsontext)

                }



                else{
                    console.log("already taken, not changed")
                    var jsontext = JSON.stringify({
                    'action': z['action'],
                    'flag': false,
                });
                
                res.send(jsontext)
                }
                });
            };

            changeuser()
   
})


//Customize Pages
app.post('/customize' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])  
    
    var num = z["theme"]
        
    if(num == 0){
        user["Settings"] = ["lightgray", "#CE7777", "#2B3A55"]
    }
    else if(num == 1){
        user["Settings"] = ["#E8C4C4", "#8EACD0", "#B0C1DB"]
        
    }
    else if(num == 2){
        user["Settings"] = ["#FCDDB0", "#FF9F9F", "#E97777"]
    }
    else if(num == 3){
        user["Settings"] = ["#FBF7F0", "#D9E400", "#CDC9C3"]
    }
   
})

app.post('/customizepage' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])   

    var jsontext = JSON.stringify({
        
        'action': z['action'],
        "back" : user["Settings"][0],
        "top": user["Settings"][1],
        "myBar":user["Settings"][2]
    });

    res.send(jsontext)
   
})

app.post('/profilepicture' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])

    user["Profilepic"] = z["theme"]
   
})

app.post('/placeprofilepicture' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])

    var jsontext = JSON.stringify({
        
        'action': z['action'],
        'url': user["Profilepic"]
    });
    // console.log(user["Profilepic"])
    
    res.send(jsontext)

       
})


app.post('/w' , (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    var z = JSON.parse(req.query['data'])

    
   
})


function removejournal(){
    client.db("Secrets").collection("Users").updateOne({Username: user.Username}, {$set: {"Journal_Entrys": user.Journal_Entrys}})
    .then(console.log("Changed"))
    }

