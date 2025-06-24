const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const  method_Override = require("method-override");
app.use(method_Override("_method"));

const{v4 : uuidv4} = require("uuid");

app.set("views engine","ejs");
const path = require("path");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));


let posts = [ {
    id:uuidv4(),
    username:"Ritesh ",
    content :" hey im creating Quora by mentored by mam"
},
{
    id:uuidv4(),
    username:"Rd",
    content :" hey buddy"
}
]

app.get("/posts",(req,res)=>{
res.render("index.ejs",{posts});
});


app.get("/posts/new",(req,res)=>{
res.render("view.ejs");
});

app.get("/posts/edit",(req,res)=>{
let id = req.query.id;
let post = posts.find(p =>id===p.id );
console.log(id);
res.render("edit.ejs",{post});
});

app.post("/posts",(req,res)=>{
let {username,content} = req.body;
let id = uuidv4();
if(username){
posts.push({id,username,content});
}else{
}
res.redirect("/posts");
});
// everytime server restarts it create new user id , hence problem comes new to refresh pageXOffset, restart website too . problem will not occuer if we used counter id



app.get("/posts/:id",(req,res)=>{
let {id} = req.params;
let post = posts.find(p =>id===p.id );
res.render("show.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
let {id} = req.params;
let newContent = req.body.content;
let post = posts.find(p =>id===p.id);
post.content=newContent;
res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
let {id} = req.params;
posts = posts.filter(p=> id != p.id);
console.log(posts);
res.render("index.ejs",{posts});
});

app.listen(port,()=>{
    console.log("Quora Server is Listing...");
})
