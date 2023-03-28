const fs = require('fs');
const configPath = './cypress.json';

const newSuiteType = process.argv[2] || 'devSanity'; // Use the provided value or default to 'devSanity'

fs.readFile(configPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading cypress.json: ${err}`);
    process.exit(1);
  }

  let config;

  try {
    config = JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing cypress.json: ${error}`);
    process.exit(1);
  }

  config.reporterOptions.suiteType = newSuiteType;

  fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(`Error writing cypress.json: ${err}`);
      process.exit(1);
    }

    console.log(`Updated suiteType to ${newSuiteType}`);
  });
});
