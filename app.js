const express = require('express')
const app = express()
const port = 4000
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
var cloudinary = require('cloudinary');

// cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

var session = require ('express-session')
var flash = require ('connect-flash');

// database connection
connectdb()

// steup ejs
app.set('view engine','ejs')

// to convert url data json form
app.use(express.urlencoded({ extended:false}))


// for file upload
app.use(fileUpload({useTempFiles: true}));


// public file use
app.use(express.static('public'))

// for flash messages
app.use(session({
  secret:'secret',
  cookie:{maxAge:60000},
  resave:false,
  saveUninitialized:false,
}));

app.use(flash());

//   router link 
app.use('/',web)


//server created
app.listen(port, () => {
  console.log(`Server Established ${port}`)
})