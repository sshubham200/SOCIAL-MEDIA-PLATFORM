const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const { urlencoded } = require('express');
const session = require('express-session');
const passport = require('passport');
const googleStrategy = require('./config/passport-google-Oauth-strategy');
const passportLocal = require('./config/local-strategy');
const MongoStore = require('connect-mongo');
// const sassMiddleWare = require('node-sass-middleware')


const db = require('./config/mongoose')

app.use(express.urlencoded());
// app.use(express.json());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayout);

// app.use(sassMiddleWare({
//   /* Options */
//   src: './assets/sass',
//   dest: './assets/css',
//   debug: true,
//   outputStyle: 'extended',
//   prefix:  '/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
// }));


app.use(session({
  name: 'my_appp',
  secret: 'mysecret', // A secret string used to sign the session ID cookie
  store : MongoStore.create(
    {
    mongoUrl:'mongodb://localhost/codeial_db',
    autoRemove: 'disabled'
  },
  function(err){
    console.log("------>")
    console.log(err);
  }
  ),
  resave: false, // Whether to save the session on every request
  saveUninitialized: false, // Whether to save uninitialized sessions
  cookie: {
    maxage : (1000 *60 * 100)
  },

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// passport.use(googleStrategy);
app.use(googleStrategy.initialize());

app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if (err){
        console.log(`Error : ${err}`);
        return ;
    }
    console.log(`Server is running on port : ${port}`);
});