const express = require("express");

const dbConnection = require("./database/dbConnection");
const bodyParser = require("body-parser");
const v1Router = require("./v1/indexV1");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1", v1Router);
app.use('/', (req, res, next) => {
    res.send("404 NOT FOUND")
})

const run = async () => {
    await dbConnection.createConnection()
    .then( connectionEstablished => {
        if (connectionEstablished) {
            app.listen(PORT, () => {
                console.log(`API is listening on port ${PORT}`);
            });
        }
    }
    );
}

run();