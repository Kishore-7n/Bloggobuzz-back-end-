const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const cors = require('cors')
const Blog = require('./models/models')
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination:function(req,file,callback){
//         callback(null, './public/uploads/images');
//     },


//     filename:function(req,file,callback){
//         callback(null,Date.now()+file.originalname)
//     }
// })


const app = express()
app.use(express.json({limit: '50mb'}));
app.use(cors())
app.get('/',(res,req) => console.log("ss"))

mongoose.connect("mongodb+srv://Kishore:mongodb2003@mycluster.jhyu1pw.mongodb.net/Blog",{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then((result)=>{
    console.log("db connected")
})
.catch((err) =>{
    console.log(err);
}); 





 
 
app.use(bodyparser.json())
app.post('/create',(req,res)=>{
    console.log(req.body)
    const blog = new Blog(req.body);
    blog.save().then(()=>{
        console.log("saved");
    }).catch((err)=>{
        console.log(err);
    })
    res.send("OK")
})

app.get('/postpreview',(req,res)=>{
    Blog.find().sort({updatedAt:-1}).then((result)=>{
        res.json(result)
    })
})




app.listen(5000, ()=>console.log("Server OK"));