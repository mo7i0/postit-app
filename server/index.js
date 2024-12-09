import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";
import dotenv from "dotenv";
dotenv.config();
const app =express();
app.use(express.json());
app.use(cors());
const con = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWWORD}@postitcluster.gc98c.mongodb.net/?retryWrites=true&w=majority&appName=PostITCluster`;
;

mongoose.connect(con)

app.listen(process.env.PORT,()=>{console.log("You are connected to the server Successfully My Dear :)")})
app.post("/registerUser", async (req, res) => {
    try {
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await user.save();
        res.send({ user: user, msg: "User Data saved Successfully" });
    } catch (error) {
        console.error("Error occurred:", error); // Log the error details
        res.status(500).json({ error: "Unexpected Error Occurred", details: error.message });
    }
});

//Express POST route for login 
app.post("/login",async(req, res)=> {
    try {
        const { email,password }=req.body;
        const user= await UserModel.findOne({ email:email });
        if(!user){
            res.send({msg:"Could't find the user with the given email"});
        }
        else if(user.password !== password){
           res.send({msg:"Authuntcation failed"});
            //falsy value
    }
    else{
        res.send({user:user, msg:'Login Successful'});
    }
}
    catch(error){
        res.status(500).json({msg:"Unexpected error occurred"})
    }
    
})

//POST API-logout
app.post("/logout", async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
  })
  
//POST API - savePost
app.post("/savePost", async (req, res) => {
    try {
  
      const post = new PostModel({
        postMsg: req.body.postMsg,
        email: req.body.email,
        
      })
  
      await post.save();
      res.send({ post: post, msg: "Added." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });

  //GET API - getPost
app.get("/getPosts", async (req, res) => {
    try {
      // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
      const posts = await PostModel.find({}).sort({ createdAt: -1 });
  
      const countPost = await PostModel.countDocuments({});
  
      res.send({ posts: posts, count: countPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });
