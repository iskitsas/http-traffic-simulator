
# Anonymization

## Overview

The Anonymizer Library is a Node.js module designed to anonymize sensitive information in various types of data, including JSON objects, URL-encoded strings, HTML content, and multipart form data. The library supports different types of data formats and allows customization of anonymization rules to suit specific needs.

## File Involved

  anonymizer.js

  anonymizerConfig.js

  main.js

## Features

- **Email Anonymization**: Replaces email addresses with a generic anonymized email.
- **Name Anonymization**: Supports full name and single name anonymization.
- **Address Anonymization**: Replaces street addresses, city names, and other location-specific details with anonymized placeholders.
- **Phone Number Anonymization**: Replaces phone numbers with a generic anonymized number.
- **URL Anonymization**: Replaces URLs with a generic anonymized URL.
- **State and ZIP Code Anonymization**: Replaces state abbreviations and ZIP codes with generic placeholders.
- **Password Anonymization**: Replaces passwords with a generic anonymized password.
- **HTML Content Anonymization**: Anonymizes HTML content, including headers, paragraphs, and links.
- **Form Data Anonymization**: Supports anonymization of multipart form data.
- **Custom Anonymization Rules**: Allows users to define custom regex patterns and replacements for specific anonymization needs.

## Structure

```
anonymizer.js
│
├── Dependencies
│   ├── multiparty
│   ├── cheerio
│   ├── fs
│   ├── path
│
├── Regular Expressions
│   ├── emailRegex
│   ├── fullNameRegex
│   ├── singleNameRegex
│   ├── addressRegex
│   ├── phoneRegex
│   ├── urlRegex
│   ├── stateRegex
│   ├── zipRegex
│   ├── passwordRegex
│
├── Variables
│   ├── anonymizationEnabled (boolean)
│   ├── manualMode (boolean) //Important Config file for manual mode
│   ├── customAnonymizationRules //Important Config file for manual mode
│
├── Functions
│   ├── anonymizeEmail(text) // email
│   ├── anonymizeFullName(text) // full name
│   ├── anonymizeSingleName(text) // single name
│   ├── anonymizeAddress(text) // address
│   ├── anonymizePhone(text) // number
│   ├── anonymizeUrl(text) //string in url
│   ├── anonymizeState(text) //state
│   ├── anonymizeZip(text) //zip
│   ├── anonymizePassword(text) //password
│   ├── applyManual(text, rules) // config driven
│   ├── anonymizeText(text) // string
│   ├── anonymizeUrlEncoded(data) //url
│   ├── anonymizeObject(obj) // obj
│   ├── anonymizeField(key, value) // address(full)
│   ├── anonymizeHtml(htmlContent) // html
│   ├── anonymizeFormData(req, callback) // form
│   ├── anonymizeRequest(options) // https req
│   ├── anonymizeResponse(response, cb) // https res
│   ├── setAnonymization(flag) // flag setter
│   ├── isAnonymizationEnabled() // flag check
│
└── Module Exports
    ├── anonymizeRequest
    ├── anonymizeResponse
    ├── anonymizeObject
    ├── anonymizeFormData
    ├── isAnonymizationEnabled
    └── setAnonymization
```

## Installation

To use the Anonymizer Library in your Node.js project, you can set anonymization mode into *true*, no install need for anonymization feature.

```
//default
let anonymizationEnabled = true;
```

## Usage

### Enabling/Disabling Anonymization

The anonymization process can be enabled or disabled using the following functions:

Standalone Script:

When you creating your script utilizing Flexbench, by importing flexbench, set the anonymization feature via core library

```javascript
const trafficSimulator = require('flexbench');

// Enable anonymization
trafficSimulator.setAnonymization(true);

// Check if anonymization is enabled
console.log(trafficSimulator.isAnonymizationEnabled()); // true
```
Server-app:

Go to server-app/tests/

Add code below to both multi-requests.js & simple-request.js

```javascript
// Enable anonymization
trafficSimulator.setAnonymization(true);
//above start
 trafficSimulator.start(threadId);
```

desktop-app:

Go to desktop-app/tests/

Add code below to both multi-requests.js & simple-request.js

```javascript
// Enable anonymization
trafficSimulator.setAnonymization(true);
//above start
 trafficSimulator.start(threadId);
```

### Anonymizing Different Data Formats

#### Anonymizing Text

To anonymize a plain text string:

```javascript
const anonymizedText = anonymizer.anonymizeText("Yujun Liu lives at 123 Main St.");
console.log(anonymizedText); // Anonymized Name lives at Anonymized Address.
```

#### Anonymizing URL-encoded Strings

To anonymize a URL-encoded string:

```javascript
const urlEncodedData = "email.YJ@example.com&name=Yujun+Liu";
const anonymizedData = anonymizer.anonymizeUrlEncoded(urlEncodedData);
console.log(anonymizedData); // email=anonymized_email@example.com&name=Anonymized+Name
```

#### Anonymizing JSON Objects

To anonymize a JSON object:

```javascript
const jsonObject = {
    name: "Yujun Liu",
    email: "YJ@example.com",
    address: "22 bond St, Anytown, USA"
};
const anonymizedObject = anonymizer.anonymizeObject(jsonObject);
console.log(anonymizedObject);
// { name: 'Anonymized Name', email: 'anonymized_email@example.com', address: 'Anonymized Address' }
```

#### Anonymizing HTML Content

To anonymize HTML content:

```javascript
const htmlContent = '<h1>Yujun Liu</h1><p>Email: YujunLiu@example.com</p>';
const anonymizedHtml = anonymizer.anonymizeHtml(htmlContent);
console.log(anonymizedHtml); 
// <h1>Anonymized Title</h1><p>Email: anonymized_email@example.com</p>
```

#### Anonymizing Multipart Form Data

To anonymize multipart form data:

```javascript
const req = {}; // your HTTP request object
anonymizer.anonymizeFormData(req, (err, anonymizedData) => {
    if (err) {
        console.error('Error anonymizing form data:', err);
    } else {
        console.log('Anonymized form data:', anonymizedData);
    }
});
```

### Anonymizing HTTP Requests and Responses

#### Anonymizing HTTP Requests

To anonymize an HTTP request before sending it:

```javascript
const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Yujun Liu', email: 'YujunLiu@example.com' })
};

const anonymizedRequestOptions = anonymizer.anonymizeRequest(options);
```

#### Anonymizing HTTP Responses

To anonymize an HTTP response after receiving it:

```javascript
const response = {}; // your HTTP response object
const anonymizedResponse = anonymizer.anonymizeResponse(response, (anonymizedResponse) => {
    console.log('Anonymized response:', anonymizedResponse);
});
```

## Configuration(Manual Mode)

The library is designed to work with a configuration file (e.g., `anonymizerConfig.json`) where custom anonymization rules can be specified. The configuration can include:

- Custom regex patterns for anonymization
- Replacement values for specific fields
- Manual mode for applying specific rules

## Error Handling

The library includes error handling to catch and report issues during the anonymization process. Errors are logged to the console, and the original data is returned if anonymization fails.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.