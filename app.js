const express = require('express');
const morgan = require('morgan');
const env = require('env')
const dotenv = require('dotenv');

const app = express();
dotenv.config();

//Middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//EJS
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

app.get('/', (req,res,next) =>{
    res.render("Wellcome");
})

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})