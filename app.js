const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");
// db url
const DB_URL = "mongodb://localhost:27017/login";
// access schema
const user = require("./schema/index");
// app must  be able to process json

app.use(express.json());

// connect to db
mongoose
  .connect(DB_URL)
  .then(() => {
    // successfully
    console.log("connected successfully");
  })
  .catch((err) => {
    // error time
    console.log("error  have occured" + err);
  });

// creating user
app.post("/register", async (req, res) => {
  // distract user
  const { username, email, password } = req.body;
  // salt is  required
  const hashedPassword = await bcrypt.hash(password, 10);
  // save in db   with await  keyword
  const savedUser = await user.create({
    username: username,
    email: email,
    password: hashedPassword,
  });
  //  return response to user with 201(created)
  return res
    .status(201)
    .json({ msg: "user created succcessfully", user: savedUser });
});

// users
app.get("/users", async (req, res) => {
  const users = await user.find();
  return res.status(200).json({ users: users });
});

// get single user
app.get("/user/:id",async (req, res) => {
    const id =req.params.id
    const userByUser  = await user.findById(id) 
    //  you can check null
    return res.status(200).json({user:userByUser})
});

// delete 
app.delete("/user/:id",async(req,res)=>{
  const id =req.params.id
  const userByUser  = await user.findByIdAndDelete(id)
  return  res.status(200).json({user:userByUser}) 
  //  you can check null
});

// update 
app.put("/user/:id", async(req,res) =>{
   const id=req.params.id
   const updateData = req.params.body
   try {
    const userByUser = await user.findByIdAndUpdate(id, updateData,{new:true});

    if (!userByUser){
      return res.status(404).json({ error:'User not found'});
    }else
    return res.status(200).json({user:userByUser});

   } catch (error) {
    console.log(error);

   }
   
});

// app listen
app.listen(4000, () => {
  console.log("your app is connect on port 4000");
});
