require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//rotes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
// //middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
//main app 

app.use('/api',authRoute);
app.use('/api',userRoute);
app.use('/api',categoryRoute);
app.use('/api',productRoute);


//connecting to database
mongoose.connect(process.env.DATABASE,
    {useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true}
    ).then(()=>console.log("connected to database"))
    .catch((err)=>console.log(err));
//main app


// //ports are runnning     
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`server is running on http://localhost:${PORT}`));


