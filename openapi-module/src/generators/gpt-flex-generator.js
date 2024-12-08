const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');
const config = require('../GPT/config');
const { parseOpenAPIDocument } = require('../parsers/openapi-parser');

async function generateFlexScenariosWithGPT(openApiFilePath, outputFilePath) {
    try {
        const endpoints = await parseOpenAPIDocument(openApiFilePath);

        if (!endpoints || endpoints.length === 0) {
            console.error('Failed to parse OpenAPI document or no endpoints found.');
            return;
        }

        const prompt = config.promptTemplate(endpoints);
        const flexScenario = await generateScenarioFromGPT(prompt);

        if (flexScenario) {
            const outputDir = path.dirname(outputFilePath);
            await ensureDirectoryExists(outputDir);

            try {
                await fs.writeFile(outputFilePath, JSON.stringify(flexScenario, null, 2));
                console.log(`Flex scenarios generated and saved to ${outputFilePath}`);
            } catch (error) {
                console.error(`Failed to write Flex scenarios to file at ${outputFilePath}:`, error);
            }
        } else {
            console.error('Failed to generate Flex scenarios using GPT.');
        }
    } catch (error) {
        console.error('An unexpected error occurred during the Flex scenario generation:', error);
    }
}

async function generateScenarioFromGPT(prompt) {
    const openai = new OpenAI({
        apiKey: config.openaiApiKey,
    });

    try {
        const response = await openai.chat.completions.create({
            model: config.model,
            messages: [
                { role: "system", content: "You are a helpful assistant that generates Flexbench scenarios based on API endpoints. Please be creative." },
                { role: "user", content: prompt }
            ],
            max_tokens: config.maxTokens,
            temperature: config.temperature,
        });

        let gptOutput = response.choices[0].message.content.trim();

        if (gptOutput.startsWith('```') && gptOutput.endsWith('```')) {
            gptOutput = gptOutput.replace(/```json|```/g, '').trim();
        }

        try {
            return JSON.parse(gptOutput);
        } catch (parseError) {
            console.error('Failed to parse GPT response into JSON:', parseError);
            console.log('GPT Output:', gptOutput);
            return null;
        }
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error('OpenAI API error:', error.status, error.message, error.code, error.type);
        } else {
            console.error('Failed to generate scenario with GPT:', error);
        }
        return null;
    }
}

async function ensureDirectoryExists(dirPath) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    } catch (error) {
        console.error(`Failed to create directory at ${dirPath}:`, error);
        throw error;
    }
}

module.exports = {
    generateFlexScenariosWithGPT
};