const mongoose = require('mongoose');

//League Schema
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    sport:{
        type: String,
        required:true
    },
    start:{
        type: Date,
        required:true
    },
    end:{
        type: Date,
        required:false
    },
    location:{
        type: String,
        required:true
    },
    creator:{
        type: String,
        required: true
    }
});

const League = module.exports = mongoose.model('League', UserSchema);