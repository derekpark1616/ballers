const mongoose = require('mongoose');

//League Schema
const LeagueSchema = mongoose.Schema({
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
    },
    participants: [String]

});

const League = module.exports = mongoose.model('League', LeagueSchema);