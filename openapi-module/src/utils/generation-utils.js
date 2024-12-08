const { generateCurlCommands } = require('../generators/curl-generator');
const { generateFlexScenariosWithGPT } = require('../generators/gpt-flex-generator');
const { generateFlexScenarios } = require('../generators/flex-generator');
const config = require('../GPT/config');
const path = require('path');

function parseArguments(args) {
    const openApiFilePathArg = args.find(arg => arg.startsWith('--openApiFilePath='));
    const outputFileNameArg = args.find(arg => arg.startsWith('--outputFileName='));
    const useGPTArg = args.find(arg => arg.startsWith('--useGPT='));
    const consumerArg = args.find(arg => arg.startsWith('--consumer='));

    return {
        openApiFilePath: openApiFilePathArg ? openApiFilePathArg.split('=')[1] : null,
        outputFileName: outputFileNameArg ? outputFileNameArg.split('=')[1] : config.outputFileName,
        useGPT: useGPTArg ? useGPTArg.split('=')[1].toLowerCase() === 'true' : config.useGPT,
        consumer: consumerArg ? consumerArg.split('=')[1] : config.consumer,
    };
}

function generateFiles(options, scriptType) {
    config.useGPT = options.useGPT;
    config.outputFileName = options.outputFileName;
    config.consumer = options.consumer;

    const outputDir = path.resolve(__dirname, '../../temp');
    const outputFilePath = path.join(outputDir, options.outputFileName);
    const curlFilePath = path.join(outputDir, 'curl-commands.sh');

    if (scriptType === 'all' || scriptType === 'flex') {
        if (config.useGPT) {
            generateFlexScenariosWithGPT(options.openApiFilePath, outputFilePath)
                .then(() => console.log(`Flex scenario generation with GPT complete. Saved as ${outputFilePath}`))
                .catch(error => console.error('Error during Flex scenario generation with GPT:', error));
        } else {
            generateFlexScenarios(options.openApiFilePath, outputFilePath)
                .then(() => console.log(`Flex scenario generation complete. Saved as ${outputFilePath}`))
                .catch(error => console.error('Error during Flex scenario generation:', error));
        }
    }

    if (scriptType === 'all' || scriptType === 'curl') {
        generateCurlCommands(options.openApiFilePath, curlFilePath)
            .then(() => console.log(`cURL commands saved as ${curlFilePath}`))
            .catch(error => console.error('Error during cURL command generation:', error));
    }
}

module.exports = {
    parseArguments,
    generateFiles,
};