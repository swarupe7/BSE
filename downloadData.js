const downloadData = require('./src/scripts/download');
const processCSV = require('./src/scripts/csv');

async function handleData() {
  try {
     // you can place a parameter in these functions inorder to perform operations on a specific date.
     //the date format should be DDMMYY ex:190123
     await downloadData();
    await processCSV();
    console.log('Data handling completed successfully.');
  } catch (error) {
    console.error('Error handling data:', error);
  }
}

handleData();