const express = require('express');
const connectDB = require('./utils/connectDB');
const cors = require("cors");
const app = express();
const uuidv4 = require("uuid").v4;

// Midleware to allow CORS
app.use(cors());

// Middleware to parse json bodies
app.use(express.json());

// Connect Database
connectDB();

const PORT = process.env.PORT || 3001;
// const dbpass = "5oQlOGH1RdMmkCbX";


// Route Imports
require("./Routes/createsensor")(app);
require("./Routes/creategroup")(app);
require("./Routes/createactuator")(app);
require("./Routes/createhook")(app);
require("./Routes/updatesensormetric")(app);
require("./Routes/getsensorlastmetric")(app);
require("./Routes/getsensorhistory")(app);
require("./Routes/getactuatorevent")(app);
require("./Routes/getallgroups")(app);
require("./Routes/getalldevices")(app);


app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON [PORT: ${PORT}]`);
});