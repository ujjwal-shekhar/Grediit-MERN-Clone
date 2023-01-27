// const express = require("express");
// const app = express();
// const cors = require("cors");
// require("dotenv").config({ path: "./config.env" });
// const port = process.env.PORT || 5000;
// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/record"));
// // get driver connection
// const dbo = require("./db/conn");
 
// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
 
//   });
//   console.log(`Server is running on port: ${port}`);
// });

// The next two lines import Expess and 
// create an Express application
const express = require("express");
const app = express();

// This we will use to join paths 
// We will join paths to our static files
// The static files are the files that are in the client folder
const path = require("path");

// This line 
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
})