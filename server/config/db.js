const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();
const mongoURI=  process.env.MONGO_URI  // create .env file storing your mongoURI secrete
const {password, cluster, dbname } =  process.env;

const InitiateMongoServer = async()=>{
    try{
        await mongoose.connect(
            `mongodb+srv://adminOlx:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
            { 
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log("connected to DB");
    }
    catch(err){
        console.log(err);
        throw err;
    }
};


module.exports = InitiateMongoServer;