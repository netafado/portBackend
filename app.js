const express    =  require('express');
const app        =  express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//db
const db = require('./config/db');

// convert to json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static( './public' ))

//cors
const cors = require('./config/cors');
app.use(cors.cors);
// routers
const userRoutes = require( './routes/userRoute' );
const postRoutes = require('./routes/postRoute');
app.use('/user', userRoutes);
app.use('/blog', postRoutes);

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
        res.send('Not found')
    }
    else if(err.status === 401){
        res.json({auth: false})
    }
    else{
        res.send("ultima rota " +  err.message)
    }
});

app.listen(process.env.PORT || process.env._PORT, ()=>{
    console.log( `Serer runing on port ${process.env._PORT|| process.env.PORT}` )
})