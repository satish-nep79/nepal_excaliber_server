const v1Router = require("./v1/indexV1");

module.exports = function (app) {
    
    app.use("/api/v1", v1Router);

}