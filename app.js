const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');


const app = express();
dotenv.config();
//Database
require("./config/databaseconfig");



//Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

//Session
app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:true,
    resave: false,
    store: MongoStore.create({
        mongoUrl:process.env.MONGOOSECONNECTIONSTRING,
        collectionName:"sessions",
        autoRemove:'native'
    }),
    cookie:{
        maxAge:1000*60*60*24
    }
}))

//Passport
app.use(passport.initialize());
app.use(passport.session());
require('./middlewares/authPassport');

// app.use((req, res, next)=>{
//     console.log(req.session)
//     console.log(req.user)
//     next()
// })

//EJS
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

app.use('/v1', require('./modules/auth/router'));

app.get('/', (req, res, next) => {
    res.render('Wellcome', {
        title: "Home"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})

app.use((error, req, res, next)=>{
    
    res.status(500).json({
        msg: error.message
    })
});