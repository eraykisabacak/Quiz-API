const express = require('express');
const app = express();
const dotenv = require('dotenv');
const routers = require('./routers/index.js');
const connectDatabase = require('./helpers/database/connectDatabase');
const customErrorHandler = require('./middlewares/errors/customErrorHandler')
var cors = require('cors')

app.use(cors());

const PORT = process.env.PORT ||  3000 ;

// Environment Variables
dotenv.config();

// Connect Database
connectDatabase();

app.use(express.json());
app.use('/api/', routers);

// Error Handling
app.use(customErrorHandler);

app.listen(PORT, () => {
    console.log(`App Started : ${PORT}`);
});
