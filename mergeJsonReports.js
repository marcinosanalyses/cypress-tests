const glob = require('glob');
const fs = require('fs');
const path = require('path');

const inputLocation = 'mochawesome-report/*.json';
const outputLocation = 'mochawesome-report/'; // Update the output location as needed
const outputFileName = 'mergedReport.json';

glob(inputLocation, (err, files) => {
  if (err) {
    console.error('Error while finding report files:', err);
    process.exit(1);
  }

  const allResults = files.reduce((mergedResults, file) => {
    const fileContent = fs.readFileSync(file, 'utf-8');
    const parsedReport = JSON.parse(fileContent);

    mergedResults.results = mergedResults.results.concat(parsedReport.results);

    // Merge meta data, including suiteType
    if (parsedReport.meta) {
      if (!mergedResults.meta) {
        mergedResults.meta = parsedReport.meta;
      } else {
        if (parsedReport.meta.marge && parsedReport.meta.marge.options) {
          mergedResults.meta.marge.options = {
            ...mergedResults.meta.marge.options,
            ...parsedReport.meta.marge.options,
          };
        }
      }
    }

    return mergedResults;
  }, { results: [] });

  const outputFilePath = path.join(outputLocation, outputFileName);
  fs.writeFileSync(outputFilePath, JSON.stringify(allResults, null, 2));
  console.log(`Merged report saved to ${outputFilePath}`);
});

