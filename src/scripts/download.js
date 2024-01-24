const axios = require('axios');
const fs = require('fs');
const unzipper = require('unzipper');



const downloadData = async (date=120124) => {
  try {
    const url = `https://www.bseindia.com/download/BhavCopy/Equity/EQ${date}_CSV.ZIP`;

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    response.data.pipe(unzipper.Extract({ path: `temp/EQ${date}` }))
      .on('close', () => {
        console.log('Data downloaded and extracted successfully.');
      });
  } catch (error) {
    console.error('Error downloading data:', error.message);
  }
};

module.exports = downloadData;
