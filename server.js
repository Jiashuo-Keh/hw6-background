const express=require('express');
const connectDB=require('./config/db');
const router = express.Router();
const config = require('config');
const md5 = require('md5');
const cookieParser = require('cookie-parser')
const {login, logout, register}= require('./routes/api/auth');
const User = require('./models/users');
const Profile=require('./models/profiles');
const Post = require('./models/articles');
let sessionUser = {};
let cookieKey = 'sid';

const app=express();

connectDB();

app.use(express.json({extended:false}))
app.use(cookieParser())


function setup(app) {
  app.post('/login', login);
  app.put('/logout', logout);
  app.post('/register', register);
}




console.log(typeof(setup))

app.get('/',(req,res)=>res.send('API Running'));
app.post('/login', login);
app.put('/logout', logout);
app.post('/register', register);
app.use('/articles',require('./routes/api/articles'))
app.use('/',require('./routes/api/profiles'));




const PORT=process.env.PORT ||3000;



app.listen(PORT,()=>console.log(`server started on port ${PORT}`));

module.exports = app;