const mongoose = require("mongoose");

const dbConnection = async () => {
    try {

        const dbString = mongoose.connect(process.env.MONGO_URI);

        await dbString;

    } catch (error) {

        console.errro(error);

        throw new Error("MongoDB is not connected.")

    }
}

module.exports = dbConnection;