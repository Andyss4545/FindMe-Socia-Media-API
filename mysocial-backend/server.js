const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./databaseConfig/dbConnection');

connectDB()


const PORT = process.env.PORT || 4002


// middleware
app.use(express.json()) // body parser as middleware
app.use(helmet())
app.use(morgan('common'))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))

app.listen(PORT,  () => {
       console.log(`Port started at PORT  ${PORT}`)
})