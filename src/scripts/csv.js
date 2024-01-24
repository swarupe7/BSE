const fs = require('fs');
const Stock = require('../models/stock');
const papa = require('papaparse');

const checkNan = (row) => {
  if (isNaN(row[4]) || isNaN(row[5]) || isNaN(row[6]) || isNaN(row[7])) {
    return false;
  }
  return true;
}

const processCSV = async (date = 120124) => {
  try {
    const csvFile = fs.readFileSync(`temp/EQ${date}/EQ${date}.CSV`, 'utf8');

    papa.parse(csvFile, {
      header: false,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: async (result) => {
        const data = result.data.slice(1); // Skip the first row (header)

        for (const row of data) {
          if (checkNan(row)) {
            const stockCode = row[0];

            
            const existingStock = await Stock.findOne({ code: stockCode });

            if (!existingStock) {
              const currentTimestamp = new Date();
              const stock = new Stock({
                code: row[0],
                name: row[1],
                open: parseFloat(row[4]),
                high: parseFloat(row[5]),
                low: parseFloat(row[6]),
                close: parseFloat(row[7]),
                date: currentTimestamp,
              });

              await stock.save();
            }
          }
        }

        console.log('CSV file successfully processed.');
      },
      error: (error) => {
        console.error('Error during CSV parsing:', error.message);
      },
    });
  } catch (error) {
    console.error('Error processing CSV:', error.message);
  }
};

module.exports = processCSV;
