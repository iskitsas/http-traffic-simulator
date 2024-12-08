module.exports = {
  useGPT: false,
  openaiApiKey: process.env.OPENAI_API_KEY,

  consumer: 'desktop-app',  // Set this to either 'desktop-app' or 'server-app'

  model: "gpt-3.5-turbo",  
  maxTokens: 1500,  
  temperature: 0.7, 

  promptTemplate: function(endpoints) {
      if (this.consumer === 'server-app') {
        return `
        You are given the following API endpoints from an OpenAPI document:

        ${JSON.stringify(endpoints, null, 2)}

        Please generate a Flex scenario JSON file that includes:
        - A "scenarioConfig" object with specific fields:
          - "delay": A range between "0.5-1.5" in seconds.
          - "throttling": A realistic number like "50000".
          - "workers": Number of workers, e.g., "4".
          - "totalclients": A number, e.g., "10".
          - "duration": The duration in minutes, e.g., "5".
        - Each request should include:
          - "method": The HTTP method.
          - "path": The API path, with placeholders like "{id}" where necessary.
          - "port": Use "4000" as the default port.
          - "host": Use "localhost" as the default host.
          - "headers": Include "Content-Type: application/json".
          - "body": Realistic example data based on the request body schema.

        Ensure the generated JSON is syntactically correct, well-structured, and closely resembles the following example:

        Example:
        {
          "scenarioConfig": {
            "scenario": {
              "delay": "0.5-1.5",
              "throttling": "50000",
              "workers": "4",
              "totalclients": "10",
              "duration": "5"
            },
            "requests": [
              {
                "method": "GET",
                "path": "/users",
                "port": "4000",
                "host": "localhost",
                "headers": {
                  "Content-Type": "application/json"
                },
                "body": {}
              },
              {
                "method": "POST",
                "path": "/users",
                "port": "4000",
                "host": "localhost",
                "headers": {
                  "Content-Type": "application/json"
                },
                "body": {
                  "name": "Joann Aufderhar Jr.",
                  "email": "Pete_Doyle92@hotmail.com"
                }
              },
              {
                "method": "GET",
                "path": "/users/{id}",
                "port": "4000",
                "host": "localhost",
                "headers": {
                  "Content-Type": "application/json"
                },
                "body": {}
              }
            ]
          }
        }`;
      } else if (this.consumer === 'desktop-app') {
        return `
        You are given the following API endpoints from an OpenAPI document:

        ${JSON.stringify(endpoints, null, 2)}

        Please generate a Flex scenario JSON file that includes:
        - A "scenarioConfig" object with specific fields:
          - "delay": A range between "0.5-1.5" in seconds.
          - "throttling": A realistic number like "50000".
          - "workers": Number of workers, e.g., "4".
          - "totalclients": A number, e.g., "10".
          - "duration": The duration in minutes, e.g., "5".
        - Each request should include:
          - "method": The HTTP method.
          - "path": The API path, with placeholders like "{id}" where necessary.
          - "port": Use "4000" as the default port.
          - "host": Use "localhost" as the default host.
          - "headers": Include "Content-Type: application/json".
          - "body": Realistic example data based on the request body schema.

        Ensure the generated JSON is syntactically correct, well-structured, and closely resembles the following example:

        Example:
        {
          "project": {
            "projectName": "aj",  // Generate realistic data
            "description": "aj",  // Generate realistic data
            "_id": "acdd056c-ce1d-4129-9043-8c8eb18455cf"  // Generate realistic ID
          },
          "scenarios": [
            {
              "projectId": "acdd056c-ce1d-4129-9043-8c8eb18455cf",  // Use generated ID
              "scenarioname": "Sample Scenario",  // Generate realistic data
              "duration": "10",
              "workers": "4",
              "totalclients": "10",
              "throttling": "50000",
              "delay": "1.0",
              "_id": "2fb27015-d0bf-4fca-ab2a-9cbc1037872c"  // Generate realistic ID
            }
          ],
          "requests": [
            {
              "scenarioId": "2fb27015-d0bf-4fca-ab2a-9cbc1037872c",  // Use generated ID
              "requestName": "www.example.com",  // Generate realistic data
              "url": "www.example.com/api",  // Generate realistic data
              "method": "GET",  // Generate realistic data
              "path": "/",  // Generate realistic data
              "port": "80",  // Generate realistic data
              "body": [  // Generate realistic data
                {
                  "key": "name",
                  "value": "yujun",
                  "type": "TEXT",
                  "description": ""
                },
                {
                  "key": "email",
                  "value": "yujun150@gmail.com",
                  "type": "TEXT",
                  "description": ""
                }
              ],
              "header": [
                {
                  "key": "Content-Type",
                  "value": "application/json",
                  "description": ""
                }
              ],
              "_id": "0bcecd91-12b7-48e9-b8d7-3b3fdd79af1d"  // Generate realistic ID
            }
          ]
        }
          
        Example 2: 
        {
  "project": {
    "projectName": "Generated Project",
    "description": "A project generated from OpenAPI document",
    "_id": "29a0a575-db2b-4deb-8fb1-26b8a368dac1"
  },
  "scenarios": [
    {
      "projectId": "29a0a575-db2b-4deb-8fb1-26b8a368dac1",
      "scenarioname": "Generated Scenario",
      "duration": "10",
      "workers": "4",
      "totalclients": "10",
      "throttling": "50000",
      "delay": "1.0",
      "_id": "dd9a3792-e5b8-4872-9170-9f6e074552ac"
    }
  ],
  "requests": [
    {
      "scenarioId": "dd9a3792-e5b8-4872-9170-9f6e074552ac",
      "requestName": "Request 1",
      "url": "http://localhost:4000/users",
      "protocol": "http",
      "host": "localhost",
      "method": "GET",
      "path": "/users",
      "port": "4000",
      "body": {},
      "header": [
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": ""
        }
      ],
      "_id": "a1b236d3-6249-463d-878d-a11881f03ce1"
    },
    {
      "scenarioId": "dd9a3792-e5b8-4872-9170-9f6e074552ac",
      "requestName": "Request 2",
      "url": "http://localhost:4000/users",
      "protocol": "http",
      "host": "localhost",
      "method": "POST",
      "path": "/users",
      "port": "4000",
      "body": {
        "name": "Mr. Jacob Predovic",
        "email": "Nadia73@hotmail.com"
      },
      "header": [
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": ""
        }
      ],
      "_id": "690d67ac-b227-4b5c-97ac-458eec8d4297"
    },
    {
      "scenarioId": "dd9a3792-e5b8-4872-9170-9f6e074552ac",
      "requestName": "Request 3",
      "url": "http://localhost:4000/users/{id}",
      "protocol": "http",
      "host": "localhost",
      "method": "GET",
      "path": "/users/{id}",
      "port": "4000",
      "body": {},
      "header": [
        {
          "key": "Content-Type",
          "value": "application/json",
          "description": ""
        }
      ],
      "_id": "a0f26ec7-015e-4fc0-8bbe-1ed52b11959d"
    }
  ]
}
        `;

        
      }
  },

  // Output settings
  outputDir: '../../temp',  
  outputFileName: 'flex-scenario.flex',  
};