const { parseArguments, generateFiles } = require('../src/utils/generation-utils');

const options = parseArguments(process.argv.slice(2));

if (!options.openApiFilePath) {
    console.error("Error: Missing required argument --openApiFilePath.");
    process.exit(1);
}

generateFiles(options, 'curl');