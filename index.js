const express = require("express")
const { body } = require("express-validator")
const mongoose = require("mongoose")

const app = express()

const connectDB = () =>{
    return mongoose.connect("mongodb://localhost:27017/u3c4")
}


const userSchma = new mongoose.Schema({
    firstName : { type : String , required : true,minlength:3 , maxlength:30},
    lastName   : { type : String , required : true ,min:3 ,maxlength :30},
    age  : { type : Number, required : true ,minlength :1 , maxlength :150},
    email :  { type : String , required : true ,unique :true ,minlength :1},
    profileImages : { type : String , required : true},
},{
    timestamps : true
})


const user = mongoose.model("user" , userSchma )


const bookSchma = new mongoose.Schema({
    likes  : { type : Number , required : true ,default :0},
    
   
    coverImage : { type : String , required : true},
    content    : { type : String , required : true},
    userId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true
     },

},{
    timestamps : true
})


const Book = mongoose.model("book" , bookSchma )




const  PublicationSchma = new mongoose.Schema({
    
    
   
    name  : { type : String , required : true},
    

},{
    timestamps : true
})


const  Publication = mongoose.model("publication" ,   PublicationSchma)



const  CommentSchma = new mongoose.Schema({
    
    
   
    body   : { type : String , required : true},
    userId : {
       type :mongoose.Schema.Types.ObjectId,
       ref : "user",
       require : true
    },
    bookId : {
        type :mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true
     }
    

},{
    timestamps : true
})


const   Comment = mongoose.model(" comment" ,     CommentSchma)


app.post("/register", async(req,res)=>{
   try {
       if(!User){
           console.log("something went wrong")
       }
       const register = User.create(req.params)
       
       return res.send(201)._construct(register)
   } catch (error) {
       console.log(error)
   }
})

app.post ("/book", 

 async(req,res ) =>{
    try {
        const register = Book.create(req.params)
        
        return res.send(201)._construct(register)
    } catch (error) {
        console.log(error)
    }
})


app.post ("/comment", async(req,res ) =>{
    try {
        const register = Comment.create(req.params)
        
        return res.send(201)._construct(register)
    } catch (error) {
        console.log(error)
    }
})
app.listen(2000, async() =>{
    try {
       await connectDB ()
    } catch (error) {
        console.log(error)
    }
    console.log("2000")
})