const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();

// connect mongodb
mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.DATABASE, {
        useNewUrlParser:true,
        // useUnifiedTopology: false,
        connectTimeoutMS: 2000
    })
    .then(() => console.log('DB connected'))
    .catch(err => console.log('DB ERROR', err));

//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const cargoRoutes = require('./routes/cargo')
const upload = require('./routes/upload')
const order = require('./routes/order')
const adminRoutes = require('./routes/admin')
const ratingRoutes = require('./routes/rating')
const sitesRoutes = require('./routes/sites')

//app midllewares
app.use(morgan('dev'));
app.use(bodyParser.json());

if(process.env.NODE_ENV = 'development'){
    app.use(cors({origin: [`http://localhost:3000`,`http://localhost:3001`, `https://ecargo.vercel.app`]}));
}


//midlewares
app.use('/api', authRoutes); 
app.use('/api', userRoutes);
app.use('/api', cargoRoutes);
app.use('/api', upload);
app.use('/api', order);
app.use('/api', adminRoutes);
app.use('/api', ratingRoutes)
app.use('/api', sitesRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`port ${port}`)
})