const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const profileSchema=new mongoose.Schema({
    username:{

        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    zip:{
        type:String,
    },
    img:{
        type:String
    },
    headline:{
        type:String,
        required:true
    },
    friends:[
        {
            username:{
                type: Schema.Types.ObjectId
            },
            avatar:{
                type:String
            },
            headline:{
                type:String
            }
        }
    ]

});

module.exports=Profile=mongoose.model('profile',profileSchema);