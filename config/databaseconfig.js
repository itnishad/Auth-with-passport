const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGOOSECONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})

.then(()=> console.log("Database Connceted"))
.catch(err => console.log(err))
