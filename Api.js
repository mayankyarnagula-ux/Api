const express = require('express');
const app = express();
const User = require("./models/User");
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
app.use(express.json());
const bcrypt=require("bcrypt");
const cors = require("cors");
app.use(cors());
//meddile ware
app.use(
  cors({
    origin: "*",
  })
);

 
//
mongoose.connect("mongodb+srv://mayankyarnagula_db_user:Api@api1.uv9kkym.mongodb.net/?appName=Api1")
.then(()=>{
    console.log("db connected")
})



//create a data
app.post("/Api/add",async(req,res)=>{
try{

const user = new User(req.body);

await user.save();

res.send(user);
 
}catch(err){
res.send(err)
}
})
//get all data
app.get("/",async(req,res)=>{
try{

    const user = await User.find();

    res.send(user);

}catch(err){
    console.log(err)
}
})
///read single data
app.get("/Api/:id",async(req,res)=>{

    try{
   

        const user = await User.findById(req.params.id);
       res.send(user);



    }catch(err){
    console.log(err)
}
})

//update
app.put("/Api/update/:id",async(req,res)=>{
  
     try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}

        )

        res.send(user);

     }catch(err){

     }

})


//delete 
app.delete("/api/:id",async(req,res)=>{

    try{
   

        const user = await User.findByIdAndDelete(req.params.id);
       res.send("user deleted");



    }catch(err){
    console.log(err)
}
})
//reg

app.post("/register", async(req,res)=>{
    
    try{

      const {name,email,password} = req.body;

      const userExists = await User.findOne({email})

      if(userExists){
        return res.end("user already in db")
      }

      const hashpassword = await bcrypt.hash(password,13);
      console.log("hashpassword",hashpassword)


      const user = new User({
        name,
        email,
        password: hashpassword
      })

      await user.save();

    }catch(err){
        console.log(err);
    }

})
//login
app.post("/login", async(req,res)=>{
try{

    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.end("user not found");
    }


    const ismatch = await bcrypt.compare(password,user.password);

    if(!ismatch){
        return res.end("inavlid pssword");
    }

   

   res.send("login done")

}catch(err){
 console.log(err);
}
})



app.listen(3000,()=>{
    console.log("server started")
})