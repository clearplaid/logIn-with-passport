require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
// const routes = require("./routes");
const user = require('./routes/user')
const PORT = process.env.PORT || 3001;
const app = express();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
const session = require("express-session");
// const MongoStore = require('connect-mongo')(session)
const passport = require("passport");
// const corsOptions = {
//   origin: process.env.ORIGIN_URL || "http://localhost",
//   optionsSuccessStatus: 200
// }


// Define middleware here
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(session({
  secret: process.env.REACT_APP_SESSION_SECRET,
  // store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
}));

app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});

app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
// app.use(routes);
app.use('/user', user)
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/gamerdb", { useNewUrlParser: true }).then(
  () => { 
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
      console.log('Connected to Mongo');
      
  },
  err => {
       /** handle initial connection error */ 
       console.log('error connecting to Mongo: ')
       console.log(err);
       
      }
);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// io.on('connection', () => { /* … */ });
// server.listen(PORT);


