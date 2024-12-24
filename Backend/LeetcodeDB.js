require('dotenv').config()
const mongoose = require('mongoose')

const URL = process.env.DB_URI

const ConnectDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log('connection established');
    } catch (error) {
        console.error('cannot connect to db');
        process.exit(0);
    }
}


module.exports = ConnectDB;