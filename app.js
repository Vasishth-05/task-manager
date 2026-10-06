require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT;

const dbConnection = require('./src/config/task.config.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./src/routes/task.routes.js")

app.use("/api/v1/tasks", router)

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