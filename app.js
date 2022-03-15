const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

//Database
require("./config/databaseconfig");

//Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

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