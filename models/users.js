const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const userSchema=new mongoose.Schema({
    username:{

        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
        required:true
    },
    hash:{
        type:String,
        required:true
    },




});

module.exports=User=mongoose.model('user',userSchema);