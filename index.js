// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const months = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// const regexDate = new RegExp(".");

// const formatDate = (date) =>
//   `${date.weekDay}, ${date.day} ${date.month} ${date.year} ${date.time} GMT`;

// const getInfoDate = (unformattedDate) => {
//   const formattedDate = new Date(unformattedDate);

//   if (!formattedDate) {
//     return "Erro na data da reuisição";
//   }

//   return {
//     weekDay: weekDays[formattedDate.getUTCDay()],
//     day:
//       formattedDate.getUTCDate() < 9
//         ? `0${formattedDate.getUTCDate()}`
//         : formattedDate.getUTCDate(),
//     month: months[formattedDate.getUTCMonth()],
//     year: formattedDate.getUTCFullYear(),
//     time: formattedDate.toUTCString(),
//     unix: formattedDate.getTimezoneOffset,
//   };
// };

app.get("/api/:timestamp", function (req, res) {
  const timestampFromRequest = req.params.timestamp;

  const date = Number(timestampFromRequest)
    ? new Date(Number(timestampFromRequest))
    : new Date(timestampFromRequest);

  if (!date.toJSON()) {
    return res.json({ error: "Invalid Date" });
  }

  const result = {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
  return res.json(result);
});

app.get("/api/", function (req, res) {
  const currentDate = new Date();

  return res.json({
    unix: currentDate.getTime(),
    utc: currentDate.toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
