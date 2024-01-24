const express = require('express');
const mongoose = require('mongoose');
const stockController = require('./src/api/stockController');
const downloadData=require('./src/scripts/download');
const processCSV=require('./src/scripts/csv');
const router =require('./src/api/favourites/fcontrol');
const router2=require('./src/api/particular/server');
const router3=require('./src/api/50days/previous');
const dotenv = require("dotenv").config();

const app = express();
const port = 3000;     

app.use(express.json());

mongoose.connect(process.env.MONGOURL)
.then(()=>{console.log('connected to mongo DB');}).catch(err=>{console.log(err)});

downloadData();
processCSV();

// API routes
app.get('/api/top10', stockController.getTop10Stocks);
app.get('/api/StockByName/:name', stockController.findStockByName);
app.use('/api/favourites',router);
app.use('/api/history',router2);
app.use('/api/last50days',router3);


    
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
