# Flexbench OpenAPI Module

This module parses OpenAPI documents and generates test scenarios in the form of `.flex` files and cURL commands for use with Flexbench.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed, preferably the latest LTS version. Verify the installation with:

```sh
node -v
npm -v
```

## Project Structure

```plaintext
openapi-module/
├── node_modules/               # Dependencies installed via npm
├── sample/                     # Sample files for testing
│   └── sample-openapi.yaml     # Example OpenAPI document
├── scripts/                    # Scripts for generating outputs
│   ├── generate-all.js         # Script to generate both cURL commands and Flex scenarios
│   ├── generate-curl.js        # Script to generate cURL commands
│   └── generate-flex.js        # Script to generate Flex scenarios (.flex files)
├── src/                        # Source files
│   ├── generators/             # Scenario and command generation logic
│   │   ├── curl-generator.js   # Logic for generating cURL commands
│   │   ├── field-mapping.js    # Mapping for generating fake data
│   │   ├── flex-generator.js   # Logic for generating Flex scenarios
│   │   └── gpt-flex-generator.js # Logic for generating Flex scenarios using GPT
│   ├── GPT/                    # GPT related configuration
│   │   └── config.js           # Configuration file for GPT settings
│   ├── parsers/                # Parsing logic
│   │   └── openapi-parser.js   # Logic for parsing OpenAPI documents
│   └── utils/                  # Utility functions
│       └── generation-utils.js # Utility functions for generation scripts
├── temp/                       # Temporary files and generated outputs
├── test/                       # Tests for the module
│   ├── generators.test.js      # Tests for generators
│   └── parser.test.js          # Tests for parsers
├── .gitignore                  # Ignored files and directories
├── package-lock.json           # npm lock file
├── package.json                # npm package file
└── README.md                   # Project documentation
```

## Installation

Install dependencies by running:

```sh
npm install
```

## Configuration

### OpenAI API Key Setup

If you use GPT for scenario generation, set your OpenAI API key as an environment variable.

#### Linux/MacOS:

Add the API key to your shell configuration file:

```bash
export OPENAI_API_KEY='your-api-key-here'
```

Reload your shell configuration:

```bash
source ~/.bashrc  # or source ~/.zshrc, etc.
```

### Module Configuration (Optional)

The module is pre-configured to work out of the box with sensible defaults. You can modify `src/GPT/config.js` to customize the behavior:

- **useGPT**: Default is `false`. Set to `true` to use GPT for generating `.flex` files.
- **openaiApiKey**: Set this in your environment if using GPT.
- **consumer**: Set this to `desktop-app` or `server-app` to determine the format of the generated `.flex` files.
- **model, maxTokens, temperature**: Pre-set for general use, but adjustable for specific needs.
- **promptTemplate**: Already tailored to generate useful Flex scenarios. Advanced users can modify it.
- **outputDir, outputFileName**: Defaults to saving outputs in the `temp` directory with a `.flex` extension.

```javascript
module.exports = {
    useGPT: false,
    openaiApiKey: process.env.OPENAI_API_KEY,
    consumer: 'desktop-app', // or 'server-app'
    model: "gpt-3.5-turbo",
    maxTokens: 1500,
    temperature: 0.7,
    promptTemplate: function(endpoints) {
        return `
        You are given the following API endpoints from an OpenAPI document:

        ${JSON.stringify(endpoints, null, 2)}

        Please generate a Flex scenario JSON file that includes:
        ...
        `;
    },
    outputDir: '../../temp',
    outputFileName: 'flex-scenario-gpt.flex',
};
```

## Usage

### Generating `.flex` Files and cURL Commands

You can generate `.flex` files and cURL commands using the scripts provided.

#### Static Approach (Faker)

1. Run the script with `--useGPT=false` to use Faker for generating data.
2. Customize field mappings in `field-mapping.js` if needed.
3. Run the scripts.

#### AI Approach (OpenAI GPT)

1. Run the script with `--useGPT=true` to use GPT for generating data.
2. Ensure your API key is set and the `promptTemplate` is configured in `config.js`.
3. Run the scripts.

### Running the Scripts

All npm scripts should be run under `openapi-module`.

Go to the `flexbench/openapi-module` on your current device:

```sh
cd /Users/yourusername/projects/flexbench/openapi-module
```

### Generate cURL Commands

Generate cURL commands based on your OpenAPI file:

```sh
npm run generate-curl -- --openApiFilePath=sample/sample-openapi.yaml --outputFileName=./temp/curl-commands.sh
```

### Generate Flex Scenarios

Generate Flex scenarios:

```sh
npm run generate-flex -- --openApiFilePath=sample/sample-openapi.yaml --outputFileName=flex-scenario.flex --useGPT=true --consumer=desktop-app
```

You can omit the `--useGPT=true` and `--consumer` arguments to use default settings, which will generate the file as `flex-scenario.flex` for the `desktop-app`.

### Generate Both cURL Commands and Flex Scenarios

Generate both cURL commands and Flex scenarios:

```sh
npm run generate-all -- --openApiFilePath=sample/sample-openapi.yaml --outputFileName=flex-scenario.flex --useGPT=true --consumer=server-app
```

### Customizing Script Execution

You can control the generation process via command-line arguments:

```sh
npm run generate-flex -- --openApiFilePath=sample/sample-openapi.yaml --outputFileName=flex-scenario.flex --useGPT=true --consumer=desktop-app
```

### Params Explained:

- **--openApiFilePath**: Path to your OpenAPI YAML file. Required for all generation scripts.
  - Example: `--openApiFilePath=sample/sample-openapi.yaml`

- **--outputFileName**: Filename for the generated `.flex` file or cURL commands. Required for all generation scripts.
  - Example: `--outputFileName=flex-scenario.flex`

- **--useGPT**: Flag to determine whether to use GPT for generating `.flex` scenarios. Set to true for GPT-based generation, or false for static. Defaults to the setting in `config.js`.
  - Example: `--useGPT=true`

- **--consumer**: Specifies the format of the `.flex` file for either `desktop-app` or `server-app`. Optional; defaults to the setting in `config.js` if not provided.
  - Example: `--consumer=desktop-app`

## Using Generated `.flex` and cURL Files

### Mock Server Setup

1. **Install Prism** to start a mock server:

```sh
npm install -g @stoplight/prism-cli 
```

2. **Run Prism** with your OpenAPI YAML file:

```sh
prism mock sample-openapi.yaml -p 4000
```

### Use with Flexbench

1. Load the generated `.flex` file into the Flexbench desktop app.
2. Run the test scenarios directly from the app.

## Testing

### Running Tests

Run tests for the module:

```sh
npm test
```
