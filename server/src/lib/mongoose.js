const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
mongoose.connection.on("error", () => {
    console.log(`EROOR: Could not connect to MongoDB`);
});

mongoose.connection.once("open", () => {
    console.log(`SUCCESS: Connected to MongoDB`);
});

module.exports = db;