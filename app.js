const express    =  require('express');
const app        =  express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

//db
const db = require('./config/db');

// convert to json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static( './public' ));

//cors
var whitelist = ['http://localhost:3000', 'http://www.isaiasfrancisco.com.br', 'https://www.isaiasfrancisco.com.br', 'http://isaiasfrancisco.com.br', 'https://isaiasfrancisco.com.br']
var corsOptions = {
  origin: function (origin, callback) {
    console.log('teste');
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cors(corsOptions));
// routers
const userRoutes = require( './routes/userRoute' );
const postRoutes = require('./routes/postRoute');
const mailRouter = require('./routes/mail');
app.use('/user', userRoutes);
app.use('/blog', postRoutes);
app.use('/mail', mailRouter);

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
        res.status(400);
        return res.json({err: "não encontrado"})
    }
    else if(err.status === 401){
        res.status(401);
        return res.json({auth: false, err: "não autorizado"})
    }
    else{
        
        res.send({ err :"ultima rota: " +  err.message} )
    }
});

app.listen(process.env.PORT || process.env._PORT, ()=>{
    console.log( `server runing on port ${process.env._PORT|| process.env.PORT}` )
})