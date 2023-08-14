const express = require("express");

const dbConnection = require("./database/dbConnection");
const bodyParser = require("body-parser");
const v1Router = require("./v1/indexV1");
const admin = require("./admin/index");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const app = express();

const PORT = process.env.PORT || 3000;

const run = async () => {
  const sequelizeDB = await dbConnection
    .createConnection()
    .then((connectionEstablished) => {
      return connectionEstablished;
    });
  if (sequelizeDB) {
    const [adminJs, adminRouter] = await admin.createAdminPanel(sequelizeDB);

    app.use(adminJs.options.rootpath, adminRouter);
    app.use(bodyParser.json());
    app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
    require("./endpoints")(app);
    app.use("/", (req, res, next) => {
      res.sendFile("pages/404.html", { root: __dirname });
    });

    app.listen(PORT, () => {
      console.log(`API is listening on port ${PORT}`);
    });
  }
};

run();
