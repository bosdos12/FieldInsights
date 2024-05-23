// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://adakcelinawork:5oQlOGH1RdMmkCbX@fieldinsights.gtworsj.mongodb.net/?retryWrites=true&w=majority&appName=fieldinsights', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
