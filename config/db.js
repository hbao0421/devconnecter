const mongoose  = require('mongoose');
const config = require('../node_modules/config');
const db = config.get('mongoURI');

const connectDB = async() =>{
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(db);
        console.log('MongoDB Connected....');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;