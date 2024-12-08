const path = require('path');
const { parseOpenAPIDocument } = require('../src/parsers/openapi-parser');

async function testParser() {
    const openApiFilePath = path.resolve(__dirname, '../sample/sample-openapi.yaml'); 

    try {
        const endpoints = await parseOpenAPIDocument(openApiFilePath);

        if (endpoints) {
            console.log('Parsed Endpoints:');
            endpoints.forEach(endpoint => {
                console.log(`Path: ${endpoint.path}`);
                console.log(`Method: ${endpoint.method}`);
                console.log(`Summary: ${endpoint.summary}`);
                console.log(`Description: ${endpoint.description}`);
                console.log('Parameters:');
                endpoint.parameters.forEach(param => {
                    console.log(`  - Name: ${param.name}`);
                    console.log(`    In: ${param.in}`);
                    console.log(`    Required: ${param.required}`);
                    console.log(`    Schema: ${JSON.stringify(param.schema)}`);
                });
                if (endpoint.requestBody) {
                    console.log('Request Body Schema:', JSON.stringify(endpoint.requestBody, null, 2));
                }
                console.log('-------------------------');
            });
        } else {
            console.error('No endpoints were parsed.');
        }
    } catch (error) {
        console.error('Error parsing the OpenAPI document:', error.message);
    }
}

testParser();