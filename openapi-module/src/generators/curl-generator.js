const fs = require('fs');
const path = require('path');
const { parseOpenAPIDocument } = require('../parsers/openapi-parser');
const { generateFakeField, generateFakeData } = require('./field-mapping');
const querystring = require('querystring');
const port = 4000;

async function generateCurlCommands(openApiFilePath, outputFilePath) {
    const endpoints = await parseOpenAPIDocument(openApiFilePath);

    if (!endpoints) {
        console.error('Failed to parse OpenAPI document.');
        return;
    }

    const outputDir = path.dirname(outputFilePath);
    ensureDirectoryExists(outputDir);

    const commands = (await Promise.all(endpoints.map(endpoint => createCurlCommand(endpoint)))).join('\n\n');
    fs.writeFileSync(outputFilePath, commands);
    console.log(`cURL commands generated and saved to ${outputFilePath}`);
}

async function createCurlCommand(endpoint) {
    let url = `http://localhost:${port}${endpoint.path.replace(/{(.*?)}/g, (_, key) => `\${${key}}`)}`;
    const method = endpoint.method;
    const headers = [];
    const params = [];
    let data = '';

    try {
        for (const param of endpoint.parameters) {
            if (param.in === 'query') {
                params.push(`${param.name}=${querystring.escape(await generateFakeField(param.name, param.schema))}`);
            } else if (param.in === 'header') {
                headers.push(`-H "${param.name}: ${await generateFakeField(param.name, param.schema)}"`);
            } else if (param.in === 'path') {
                url = url.replace(`\${${param.name}}`, querystring.escape(await generateFakeField(param.name, param.schema)));
            }
        }

        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            if (endpoint.requestBody) {
                if (endpoint.requestBody.content) {
                    const contentType = Object.keys(endpoint.requestBody.content)[0];
                    headers.push(`-H "Content-Type: ${contentType}"`);

                    if (contentType === 'application/json') {
                        const fakeData = await generateFakeData(endpoint.requestBody.content[contentType].schema);
                        data = `-d '${JSON.stringify(fakeData)}'`;
                    } else if (contentType === 'application/x-www-form-urlencoded') {
                        const formData = await generateFakeData(endpoint.requestBody.content[contentType].schema);
                        data = `-d '${querystring.stringify(formData)}'`;
                    } else {
                        console.warn(`Unsupported content type: ${contentType}`);
                    }
                } else if (endpoint.requestBody.type) {
                    headers.push(`-H "Content-Type: application/json"`);
                    const fakeData = await generateFakeData(endpoint.requestBody);
                    data = `-d '${JSON.stringify(fakeData)}'`;
                }
            }
        }

        const queryString = params.length ? `?${params.join('&')}` : '';
        return `curl -X ${method} "${url}${queryString}" ${headers.join(' ')} ${data}`.trim();
    } catch (error) {
        console.error(`Error generating cURL command for endpoint ${method} ${url}:`, error);
        return '';
    }
}

function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    }
}

module.exports = {
    generateCurlCommands
};