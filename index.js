const path = require("path");
const axios = require("axios");
const express = require("express");
const fs = require("fs");
const events = require("events");
const rateLimit = require("express-rate-limit");
const app = express();
const cors = require("cors");
const userController = require("./controllers/users");
const port = process.env.PORT || 3003;
const publicPath = path.join(__dirname, "public");
const dayjs = require('dayjs')
app.use(cors());

// const limiter = rateLimit({
//     windowMs: 2000 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//     message: "Too many requests from this IP, please try again after a minute"
// });
// app.use(limiter);
const em = new events.EventEmitter();
em.on("FirstEvent", function (data) {
  console.log("First subscriber: " + data);
});

// Raising FirstEvent
em.emit("FirstEvent", "This is my first Node.js event emitter example.");

var myLogger = function (req, res, next) {
  const now = new Date();
  fs.appendFile(
    "log.txt",
    req.originalUrl + "," + dayjs().format('ddd, MMM D, YYYY h:mm A')  + "\n",
    (err) => {
      if (err) console.log(err);
      console.log(req.originalUrl);
    }
  );
  next();
};
// axios.get("https://ghibliapi.herokuapp.com/films").then((response) => {
//   console.log("Successfully retrieved our list of movies");
//   response.data.forEach((movie) => {
//     console.log(`${movie["title"]}, ${movie["release_date"]}`);
//   });
// });

app.use(myLogger);
// app.get("/users", userController.create);

app.use(express.static(__dirname + "/public"));
app.get("/send", (req, res) => {
  res.status(201).send({ error: "something blew up" });
});
app.get("/read_log", (req, res) => {
  fs.readFile("log.txt", "utf8", function (err, data) {
    if (err) err;
    res.sendFile(path.join(__dirname, "log.txt"));
  });
});
app.get("/summary", (req, res) => {
  res.sendFile(path.join(__dirname, "summary.json"));
});
app.get("/summary_brand", (req, res) => {
  res.sendFile(path.join(__dirname, "summary_brand.json"));
});
app.get("/*", function (req, res) {
  res.status(200).sendFile(path.join(__dirname + "/public", "index.html"));
});
// app.use(myLogger);

// app.get('*', (req, res) => {
//     console.log(req.ip);
//     res.write('<h1>Something broke!</h1>');
// });
// app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.status(404).send('<h1>Something broke!</h1>');
// });
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
