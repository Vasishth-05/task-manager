require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT;

const dbConnection = require('./src/config/task.config.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function serverCall() {
    dbConnection()

    app.listen(port, (err) => {
        if (err) {
            return console.log('Something bad happened', err);
        }
        console.log(`Server is listening on ${port}`);
    });
}

serverCall()



module.exports = app;