const express = require('express');
const app = express();
const dotenv = require('dotenv');
const routers = require('./routers/index.js');
const connectDatabase = require('./helpers/database/connectDatabase');


const PORT = 3000 || process.env.PORT;

dotenv.config({
  path: './config/env/config.env',
});

connectDatabase();

app.use(express.json());
app.use('/api/', routers);

app.listen(PORT, () => {
    console.log(`App Started : ${PORT}`);
});
