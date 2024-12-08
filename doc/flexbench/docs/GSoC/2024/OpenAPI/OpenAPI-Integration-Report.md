
# OpenAPI-Feature-Report

## Introduction

This report explores how to parse OpenAPI (Swagger) documents using Node.js. The goal is to identify suitable libraries and methods to read and extract information from OpenAPI documents.

## Available Node.js Libraries for OpenAPI Document Parsing

### 1. Swagger Parser

**Description**: Swagger Parser is a powerful schema validator for OpenAPI specifications.

**Features**:
- Parse, validate, and dereference JSON/YAML schemas.
- Resolve references (`$ref`) and bundle schemas.

**Installation**:
```bash
npm install @apidevtools/swagger-parser
```

**Example Usage**:
```javascript
const SwaggerParser = require('@apidevtools/swagger-parser');

async function parseOpenAPI() {
  const api = await SwaggerParser.validate('path/to/openapi.yaml');
  console.log(api);
}

parseOpenAPI();
```

## Break down of OpenAPI (Swagger) file structure

1. **OpenAPI Version**:
   - Specifies the version of the OpenAPI Specification that the document conforms to.
   ```yaml
   openapi: 3.0.0
   ```

2. **Info**:
   - Provides metadata about the API, including the title, description, version, terms of service, contact information, and license.
   ```yaml
   info:
     title: Sample API
     description: A sample API to illustrate OpenAPI concepts
     version: 1.0.0
     termsOfService: http://example.com/terms/
     contact:
       name: API Support
       url: http://www.example.com/support
       email: support@example.com
     license:
       name: Apache 2.0
       url: http://www.apache.org/licenses/LICENSE-2.0.html
   ```

3. **Servers**:
   - Defines the base URLs for the API. These can include server environments like development, staging, and production.
   ```yaml
   servers:
     - url: https://api.example.com/v1
       description: Production server
     - url: https://staging-api.example.com/v1
       description: Staging server
   ```

4. **Paths**:
   - Specifies the available endpoints (paths) for the API and the HTTP methods supported by each endpoint. Each path can have multiple operations (e.g., GET, POST, PUT, DELETE).
   ```yaml
   paths:
     /users:
       get:
         summary: Get users
         operationId: getUsers
         responses:
           '200':
             description: A list of users
             content:
               application/json:
                 schema:
                   type: array
                   items:
                     type: object
                     properties:
                       id:
                         type: integer
                       name:
                         type: string
       post:
         summary: Create user
         operationId: createUser
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 type: object
                 properties:
                   name:
                     type: string
                   email:
                     type: string
         responses:
           '201':
             description: User created
             content:
               application/json:
                 schema:
                   type: object
                   properties:
                     id:
                       type: integer
                     name:
                       type: string
                     email:
                       type: string
     /users/{id}:
       get:
         summary: Get user by ID
         operationId: getUserById
         parameters:
           - name: id
             in: path
             required: true
             schema:
               type: integer
         responses:
           '200':
             description: User details
             content:
               application/json:
                 schema:
                   type: object
                   properties:
                     id:
                       type: integer
                     name:
                       type: string
                     email:
                       type: string
   ```

5. **Components**:
   - Reusable components such as schemas, responses, parameters, examples, request bodies, headers, security schemes, and callbacks. These components can be referenced throughout the specification to avoid duplication.
   ```yaml
   components:
     schemas:
       User:
         type: object
         properties:
           id:
             type: integer
           name:
             type: string
           email:
             type: string
     responses:
       NotFound:
         description: Entity not found
     parameters:
       userId:
         name: id
         in: path
         required: true
         schema:
           type: integer
   ```

6. **Security**:
   - Describes the security mechanisms (e.g., API key, OAuth2, Basic authentication) that are used to protect the API endpoints.
   ```yaml
   security:
     - apiKeyAuth: []
   components:
     securitySchemes:
       apiKeyAuth:
         type: apiKey
         in: header
         name: X-API-Key
   ```

7. **Tags**:
   - Allows for logical grouping of operations by resources or any other qualifier. Tags can be used for organizing the documentation.
   ```yaml
   tags:
     - name: user
       description: Operations related to users
   ```

8. **External Documentation**:
   - Provides additional external documentation references.
   ```yaml
   externalDocs:
     description: Find more info here
     url: http://example.com
   ```


## Functions and Methods of Swagger Parser

### 1. `validate`

Validates an OpenAPI document and returns the dereferenced API object. This ensures the document conforms to the OpenAPI Specification.

**Example Usage**:
```javascript
const SwaggerParser = require('@apidevtools/swagger-parser');

async function validateOpenAPI(filePath) {
  try {
    const api = await SwaggerParser.validate(filePath);
    console.log('API name:', api.info.title);
    console.log('API version:', api.info.version);
  } catch (err) {
    console.error('Validation failed:', err.message);
  }
}

validateOpenAPI('path/to/openapi.yaml');
```

### 2. `dereference`

Dereferences an OpenAPI document, replacing all `$ref` pointers with the referenced objects. This is useful for working with a fully resolved API definition.

**Example Usage**:
```javascript
const SwaggerParser = require('@apidevtools/swagger-parser');

async function dereferenceOpenAPI(filePath) {
  try {
    const api = await SwaggerParser.dereference(filePath);
    console.log('Dereferenced API:', JSON.stringify(api, null, 2));
  } catch (err) {
    console.error('Dereferencing failed:', err.message);
  }
}

dereferenceOpenAPI('path/to/openapi.yaml');
```

### 3. `bundle`

Bundles the OpenAPI document into a single file, resolving all references but keeping the `$ref` pointers intact. This is useful for creating a self-contained API definition.

**Example Usage**:
```javascript
const SwaggerParser = require('@apidevtools/swagger-parser');
const fs = require('fs');

async function bundleOpenAPI(filePath, outputPath) {
  try {
    const api = await SwaggerParser.bundle(filePath);
    fs.writeFileSync(outputPath, JSON.stringify(api, null, 2));
    console.log('Bundled API saved to', outputPath);
  } catch (err) {
    console.error('Bundling failed:', err.message);
  }
}

bundleOpenAPI('path/to/openapi.yaml', 'path/to/bundled-api.json');
```

### 4. `parse`

Parses the OpenAPI document and returns the parsed API object without validation. This is useful for quickly loading the API definition without checking for correctness.

**Example Usage**:
```javascript
const SwaggerParser = require('@apidevtools/swagger-parser');

async function parseOpenAPI(filePath) {
  try {
    const api = await SwaggerParser.parse(filePath);
    console.log('Parsed API:', JSON.stringify(api, null, 2));
  } catch (err) {
    console.error('Parsing failed:', err.message);
  }
}

parseOpenAPI('path/to/openapi.yaml');
```

## Information useful to Flexbench testing purpose

1.	API Endpoints:
	•	Description: Extract the list of all available endpoints (paths) in the API.
	•	Usage: Each endpoint represents a test scenario where various HTTP methods (GET, POST, PUT, DELETE) need to be tested.
2.	HTTP Methods:
	•	Description: For each endpoint, identify the supported HTTP methods.
	•	Usage: Determine the type of requests to be made (e.g., GET requests for retrieving data, POST requests for creating data).
3.	Parameters:
	•	Path Parameters: Extract path parameters required by the endpoint.
	•	Query Parameters: Extract optional or required query parameters.
	•	Header Parameters: Extract any custom headers required for the request.
	•	Body Parameters: Extract the schema for the request body (for methods like POST and PUT).
4.	Request Body Schema:
	•	Description: For methods that require a request body (e.g., POST, PUT), extract the schema and generate realistic test data.
	•	Usage: Use tools like Faker to generate valid input data for testing different scenarios (e.g., valid and invalid data).
5.	Responses:
	•	Description: Extract the expected responses for each endpoint and method, including the status codes and response body schemas.
	•	Usage: Verify that the actual responses match the expected responses defined in the OpenAPI document.
6.	Security Requirements:
	•	Description: Identify any security mechanisms (e.g., API keys, OAuth2) required to access the endpoints.
	•	Usage: Include appropriate authentication headers in the test scenarios.

## Example Implementation

```
const SwaggerParser = require('@apidevtools/swagger-parser');
const fs = require('fs');
const faker = require('faker');

async function generateFlexScenarios(openApiFilePath, outputDir) {
    try {
        const api = await SwaggerParser.validate(openApiFilePath);
        const scenarios = [];

        for (const [pathKey, pathValue] of Object.entries(api.paths)) {
            for (const [method, operation] of Object.entries(pathValue)) {
                const scenario = createFlexScenario(pathKey, method, operation);
                scenarios.push(scenario);
            }
        }

        const outputFilePath = path.join(outputDir, 'scenarios.flex');
        fs.writeFileSync(outputFilePath, JSON.stringify(scenarios, null, 2));
        console.log(`Flex scenarios generated and saved to ${outputFilePath}`);
    } catch (err) {
        console.error(`Error generating flex scenarios: ${err.message}`);
    }
}

function createFlexScenario(path, method, operation) {
    const scenario = {
        path,
        method,
        summary: operation.summary || '',
        description: operation.description || '',
        parameters: extractParameters(operation.parameters),
        requestBody: operation.requestBody ? generateFakeData(operation.requestBody.content['application/json'].schema) : null,
        responses: extractResponses(operation.responses),
        security: operation.security || []
    };

    return scenario;
}

function extractParameters(parameters) {
    const extracted = {
        path: {},
        query: {},
        header: {},
        body: {}
    };

    if (parameters) {
        parameters.forEach(param => {
            if (param.in === 'path') {
                extracted.path[param.name] = param.schema;
            } else if (param.in === 'query') {
                extracted.query[param.name] = param.schema;
            } else if (param.in === 'header') {
                extracted.header[param.name] = param.schema;
            } else if (param.in === 'body') {
                extracted.body[param.name] = param.schema;
            }
        });
    }

    return extracted;
}

function generateFakeData(schema) {
    const data = {};
    for (const [key, value] of Object.entries(schema.properties)) {
        if (value.type === 'string') {
            data[key] = faker.lorem.word();
        } else if (value.type === 'integer') {
            data[key] = faker.datatype.number();
        } else if (value.type === 'boolean') {
            data[key] = faker.datatype.boolean();
        }
    }
    return data;
}

function extractResponses(responses) {
    const extracted = {};
    for (const [statusCode, response] of Object.entries(responses)) {
        extracted[statusCode] = response.description;
    }
    return extracted;
}

module.exports = {
    generateFlexScenarios
};
```

**Recommended Approach**:
For the Flexbench project, **Swagger Parser** is recommended
