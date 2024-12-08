const SwaggerParser = require('@apidevtools/swagger-parser');

/**
 * Constructs an endpoint object with relevant information.
 * @param {string} pathKey - The path of the endpoint.
 * @param {string} method - The HTTP method (GET, POST, etc.).
 * @param {object} operation - The operation object from the OpenAPI document.
 * @returns {object} - The constructed endpoint object.
 */
function constructEndpoint(pathKey, method, operation) {
    return {
        path: pathKey,
        method: method.toUpperCase(),
        summary: operation.summary || 'No summary provided',
        description: operation.description || 'No description provided',
        parameters: operation.parameters || [],
        requestBody: operation.requestBody ? getRequestBodySchema(operation.requestBody) : null,
        responses: operation.responses || {},
    };
}

/**
 * Extracts the schema from the requestBody if it exists.
 * @param {object} requestBody - The requestBody object from the OpenAPI document.
 * @returns {object} - The schema of the request body.
 */
function getRequestBodySchema(requestBody) {
    const content = requestBody.content;
    if (content && content['application/json']) {
        return content['application/json'].schema || {};
    }
    return {};
}

/**
 * Parses an OpenAPI document and extracts endpoint information.
 * @param {string} openApiFilePath - The file path to the OpenAPI document.
 * @returns {Promise<object[]>} - A promise that resolves to an array of endpoints.
 */
async function parseOpenAPIDocument(openApiFilePath) {
    try {
        const api = await SwaggerParser.validate(openApiFilePath);
        const endpoints = [];

        for (const [pathKey, pathValue] of Object.entries(api.paths)) {
            for (const [method, operation] of Object.entries(pathValue)) {
                const endpoint = constructEndpoint(pathKey, method, operation);
                endpoints.push(endpoint);
            }
        }

        return endpoints;
    } catch (err) {
        console.error(`Error parsing OpenAPI document: ${err.message}`);
        return null;
    }
}

module.exports = {
    parseOpenAPIDocument,
};