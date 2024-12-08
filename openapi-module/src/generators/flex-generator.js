const fs = require('fs');
const path = require('path');
const { parseOpenAPIDocument } = require('../parsers/openapi-parser');
const { generateFakeField, generateFakeData } = require('./field-mapping'); 
const config = require('../GPT/config');
const port = 4000;

async function generateFlexScenarios(openApiFilePath, outputFilePath) {
    const endpoints = await parseOpenAPIDocument(openApiFilePath);

    if (!endpoints) {
        console.error('Failed to parse OpenAPI document.');
        return;
    }

    const outputDir = path.dirname(outputFilePath);
    ensureDirectoryExists(outputDir);

    const projectId = await generateFakeField('uuid', { format: 'uuid' });

    const scenarioId = await generateFakeField('uuid', { format: 'uuid' });

    const scenarios = [
        {
            projectId: projectId,
            scenarioname: "Generated Scenario",
            duration: "10",
            workers: "4",
            totalclients: "10",
            throttling: "50000",
            delay: "1.0",
            _id: scenarioId 
        }
    ];

    const requests = await Promise.all(endpoints.map((endpoint, index) => 
        createFlexRequest(endpoint, scenarioId, index + 1)
    ));

    let scenarioConfig;

    if (config.consumer === 'desktop-app') {
        scenarioConfig = {
            project: {
                projectName: "Generated Project",
                description: "A project generated from OpenAPI document",
                _id: projectId 
            },
            scenarios: scenarios,
            requests: requests
        };
    } else if (config.consumer === 'server-app') {
        scenarioConfig = {
            scenarioConfig: {
                scenario: {
                    delay: "0.5-1.5",
                    throttling: "50000",
                    workers: "4",
                    totalclients: "10",
                    duration: "5"
                },
                requests: requests.map(request => ({
                    method: request.method,
                    path: request.path,
                    port: request.port,
                    host: request.host,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: request.body
                }))
            }
        };
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(scenarioConfig, null, 2));
    console.log(`Flex scenarios generated and saved to ${outputFilePath}`);
}

async function createFlexRequest(endpoint, scenarioId, requestIndex) {
    const request = {
        scenarioId: scenarioId, 
        requestName: `Request ${requestIndex}`,
        url: `http://localhost:${port}${endpoint.path}`,
        protocol: "http",
        host: "localhost",
        method: endpoint.method,
        path: endpoint.path,
        port: `${port}`,
        body: {},
        header: [],
        _id: await generateFakeField('uuid', { format: 'uuid' })
    };

    if (['POST', 'PUT', 'PATCH'].includes(endpoint.method)) {
        if (endpoint.requestBody && endpoint.requestBody.properties) {
            request.body = await generateFakeData(endpoint.requestBody);
        }
    }

    if (endpoint.headers) {
        request.header = Object.keys(endpoint.headers).map(key => ({
            key: key,
            value: endpoint.headers[key],
            description: ""
        }));
    } else {
        request.header.push({
            key: "Content-Type",
            value: "application/json",
            description: ""
        });
    }

    return request;
}

function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    }
}

module.exports = {
    generateFlexScenarios
};