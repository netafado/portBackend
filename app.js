const express    =  require('express');
const app        =  express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//db
const db = require('./config/db');

// convert to json
app.use(bodyParser.json());
app.use(cookieParser());

//cors
const cors = require('./config/cors');
app.use(cors.cors);
// routers
const userRoutes = require( './routes/userRoute' );
app.use('/user', userRoutes);

//404
app.use((req, res, next)=>{
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//middleware error handler
app.use((err, req, res, next)=>{
    if(err.status === 404)
    {
        res.json({message: 'Not found'})
    }else{
        res.send("ultima rota " +  err.message)
    }
});

app.listen(process.env.PORT, ()=>{
    console.log( `Serer runing on port}` )
})