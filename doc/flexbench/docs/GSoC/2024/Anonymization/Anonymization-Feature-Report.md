## Introduction

This report explores the practical implementation of data anonymization techniques within the Flexbench project. The techniques used in the anonymizer target various sensitive data fields, such as Names, Emails, Phone Numbers, Addresses, and more. This document provides an overview of the techniques used and how they are applied within the Flexbench anonymizer.

## Anonymization Techniques

### Data Masking
- **Description**: Data masking replaces real data with structurally similar, fake data. This approach is used in the Flexbench anonymizer for fields like names and emails.
- **Suitable for**: Names, emails, and addresses.
- **Example**:
  - **Original**: Yujun Liu
  - **Masked**: Anonymized Name
- **Pros**: Maintains data format, ensuring that the structure remains valid and functional within systems.
- **Cons**: Depending on the implementation, masked data might be reversible if the algorithm isn't robust.

### Pseudonymization
- **Description**: Pseudonymization replaces private identifiers with fake identifiers or pseudonyms, effectively balancing data utility and privacy.
- **Suitable for**: Emails, names, and user identifiers.
- **Example**:
  - **Original**: yujunliu150@gmail.com
  - **Pseudonymized**: anonymized_email@example.com
- **Pros**: Balances data utility and privacy, especially when identifiers are required to maintain some uniqueness or recognizability.
- **Cons**: If not handled carefully, pseudonyms can be re-identified if linked with external data.

### Generalization
- **Description**: Generalization reduces the precision of data to make it less identifiable. In the Flexbench anonymizer, this is applied to locations like states and ZIP codes.
- **Suitable for**: Addresses, states, and ZIP codes.
- **Example**:
  - **Original**: Watertown, MA, 02472
  - **Generalized**: Watertown, MA
- **Pros**: Retains geographic information for analysis while reducing identifiability.
- **Cons**: Less effective for small datasets where the generalized data may still be unique.

### Data Shuffling
- **Description**: Data shuffling randomly reorders data within a dataset. While this isn't directly implemented in the Flexbench anonymizer, the concept aligns with randomizing certain aspects of data, such as phone numbers.
- **Suitable for**: Phone numbers and addresses.
- **Example**:
  - **Original**: (123) 456-7890
  - **Shuffled**: (789) 456-1230
- **Pros**: Maintains data format, making the shuffled data appear realistic.
- **Cons**: Can disrupt patterns that might be necessary for some analyses.

### Specific Implementation Techniques in Flexbench

#### Names
- **Techniques**:
  - Data masking with the term "Anonymized Name."
  - Random shuffling of the original name (although not directly implemented).
  - Replacing full names with "Anonymized Name" to ensure consistent anonymization.

#### Emails
- **Techniques**:
  - Replacing email addresses with "anonymized_email@example.com."
  - General masking to hide the actual email while retaining the format.

#### Phone Numbers
- **Techniques**:
  - Replacing phone numbers with a generic "000-000-0000" to anonymize the data while keeping the format.
  
#### Addresses
- **Techniques**:
  - Generalization of street, city, and ZIP code data to "Anonymized Address" and "00000" respectively.
  - Replacement of state abbreviations with "XX."

### Practical Considerations

The Flexbench anonymizer relies on a combination of these techniques to balance data privacy and utility. The methods used are designed to maintain the structural integrity of the data while ensuring that sensitive information is obfuscated or generalized. Each technique is applied based on the type of data being processed, ensuring that the anonymization process is both effective and efficient.

#### Anonymizer.js

1. Anonymization Functions:
  - anonymizeText: Handles generic text anonymization by applying a series of specialized functions.
	-	anonymizeEmail, anonymizeFullName, anonymizeSingleName, anonymizeAddress, anonymizePhone, anonymizeUrl, anonymizeState, anonymizeZip, anonymizePassword: Specialized functions for anonymizing specific types of data (e.g., emails, names, addresses, etc.).
2.	Data Type Handlers:
	-	anonymizeObject: Recursively anonymizes properties within an object.
	-	anonymizeUrlEncoded: Anonymizes URL-encoded data.
	-	anonymizeFormData: Anonymizes multipart form data, commonly used in file uploads.
	-	anonymizeHtml: Anonymizes HTML content, specifically targeting text within tags and attributes like href in anchor tags.
3.	Request and Response Handling:
	-	anonymizeRequest: Anonymizes the request body based on its content type (e.g., JSON, URL-encoded, multipart/form-data).
	-	anonymizeResponse: Processes and anonymizes the response body before it is sent back to the client. Uses a mock response stream to manipulate the data.
4.	Configuration and Control:
	-	setAnonymization, isAnonymizationEnabled: Functions to control whether anonymization is active, allowing for flexible enable/disable mechanisms.