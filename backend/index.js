const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");//using this path we can get access to our backend directory in our express app
const cors = require("cors");
const { type } = require("os");
const { log } = require("console");
const { request } = require("http");

app.use(express.json());//Middleware like express.json() parses the raw JSON data from the body of an HTTP request into a JavaScript object.
// app.use(cors({ origin: 'http://localhost:5173' }));The error occurred because you specified a strict origin value in the cors configuration, allowing requests only from http://localhost:5173.
//  If your frontend was running on a different port (e.g., http://localhost:3000), the server rejected the request due to a mismatch in the origin.

//reactjs project connect to express app at port 4000
app.use(cors());//access to frontend
//Database connection with mongodb

//The issue with the password Kawaii77Miwi// is that the forward slashes (/) are special characters 
// in a MongoDB connection string and must be URL-encoded.
// mongoose.connect("mongodb+srv://greatstackdev:Kawaii77Miwi//@cluster0.rgjsl.mongodb.net/e-commerce")
mongoose.connect("mongodb+srv://greatstackdev:Kawaii77Miwi%2F%2F@cluster0.rgjsl.mongodb.net/e-commerce");

//API creation
app.get("/",(req,res)=>{
    res.send("Express App is running")
})

//Image storage engine
const storage=multer.diskStorage({//This creates a storage engine to specify how and where files should be stored on the disk.
    destination:'./upload/images',//where uploaded files will be saved
    filename:(req,file,cb)=>{// how the file should be named after being uploaded.
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
//Multer will handle incoming multipart/form-data requests and store the uploaded files 
// according to the diskStorage settings.
const upload =multer({storage:storage})
//Creating uplaod endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
//Schema for creating products
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        
        type:Date,
        default:Date.now,
        
    },
    available:{
        type:Boolean,
        default:true,
    },
})
app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
       let last_product_array=products.slice(-1);
       let last_product=last_product_array[0];
       id=last_product.id+1;
    }else{
        id=1;
    }
    const product=new Product({
        id:id,//The error likely happens because the client is not sending the id field in the request body. 
        // So when you try to access req.body.id, it is undefined, and Mongoose requires that the id field be provided as per your schema,
        //  which causes the validation error. you're calculating the id value server-side (from the last product's id), and it is not something
        //  that is typically provided by the client when creating a new product.
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log("Saved")
    res.json({
        success:true,
        name:req.body.name,
    })

})

//creating API for deleting products
app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})
//Creating API for getting all products
app.get('/allproduct',async (req,res)=>{
    let products=await Product.find({});
    console.log("All products fetched");
    res.send(products);
})
//Schema creating for user model
const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },password:{
        type:String,

    },
    cartData:{
        type:Object,
    },
    date:{
        
        type:Date,
        default:Date.now,
        
    },

})
//Creating endpoint for registering the user
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});//checks whether already email account exist
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same emailid"})
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    //saving user on database
    await user.save();
    //to use jwt authentication we'll create one data
    const data={//creating token
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})
//Creating endpoint for user login
app.post('/login',async (req,res)=>{
    let user=await Users.findOne({email:req.body.email});//: This line queries the database to find a user whose email matches the one sent in the request body (req.body.email).
    // await keyword ensures that the code waits for the database query to complete before moving to the next line.
    if(user){
        const passCompare=req.body.password===user.password;//This compares the password provided in the request (req.body.password) with the password stored in the database for the found user (user.password).
        if(passCompare){
            const data={//This creates an object data with the user's id. This id will be included in the JWT token that will be generated later.
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');//jwt.sign(data, 'secret_ecom'): This generates a JSON Web Token (JWT) based on the data object (which contains the user's id).
            //A token in web development is a string of data that is used to verify the identity of a user or system and ensure that they have the necessary permissions to access resources
            res.json({success:true,token});
        }else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }else{
        res.json({success:false,errors:"Wrong emailid"})
    }
})
//Creating endpoint for new collection data
app.get('/newcollection',async (req,res)=>{
    let products=await Product.find({});//all products will be saved in this product array
    //slicing the product array
    let newcollection=products.slice(1).slice(-8);//recently added 8 products
    console.log("new collection fetched")
    res.send(newcollection);

})
//Creating endpoint for popular in women data
app.get('/popularinwomen',async (req,res)=>{
    let products=await Product.find({category:"women"});//all products will be saved in this product array with category women
    //slicing the product array
    let popular_in_women=products.slice(0,4);//recently added 4 products
    console.log("popular in women fetched")
    res.send(popular_in_women);

})
//creating middleware to fetch user
const fetchUser=async (req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }else{
        try {
            const data=jwt.verify(token,'secret_ecom');//token is decoded
            req.user=data.user;
            next();

        } catch (error) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
    }
}
//creating endpoint for adding producrs in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    // console.log(req.body,req.user);
    console.log("Added",req.body.ItemId);
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.ItemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})
//craeting endpoint toremove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("Removed",req.body.ItemId);
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.ItemId]>0)
    userData.cartData[req.body.ItemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})
//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})
app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port"+ port)

    }else{
        console.log("Error: "+error)
    }
})
