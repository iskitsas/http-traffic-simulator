const { faker } = require('@faker-js/faker');
const config = require('../GPT/config'); 

const fieldFakerMapping = {
    'name': () => faker.person.fullName(),
    'email': () => faker.internet.email(),
    'phone': () => faker.phone.number(),
    'address': () => faker.location.streetAddress(),
    'city': () => faker.location.city(),
    'state': () => faker.location.state(),
    'country': () => faker.location.country(),
    'zip': () => faker.location.zipCode(),
    'date': () => faker.date.recent().toISOString(),
    'time': () => faker.date.recent().toISOString(),
    'company': () => faker.company.name(),
    'product': () => faker.commerce.productName(),
    'price': () => faker.commerce.price(),
    'transaction': () => faker.finance.transactionDescription(),
    'account': () => faker.finance.accountNumber(),
    'crypto': () => faker.finance.bitcoinAddress(),
    'color': () => faker.color.human(),
    'adjective': () => faker.hacker.adjective(),
    'noun': () => faker.hacker.noun(),
    'username': () => faker.internet.userName(),
    'password': () => faker.internet.password(),
    'url': () => faker.internet.url(),
    'ip': () => faker.internet.ip(),
    'ipv6': () => faker.internet.ipv6(),
    'uuid': () => faker.string.uuid(),
    'text': () => faker.lorem.text(),
    'number': () => faker.number.int({ max: 1000 }),
    'boolean': () => faker.datatype.boolean()
};

async function generateFakeField(key, value) {
    const lowerKey = key.toLowerCase();

    for (const [field, fakerFunction] of Object.entries(fieldFakerMapping)) {
        if (lowerKey.includes(field)) {
            return fakerFunction();
        }
    }

    // Default handling if no match in field mapping
    if (value.type === 'string') {
        return faker.lorem.word();
    } else if (value.type === 'integer') {
        return faker.number.int({ min: 1, max: 1000 });
    } else if (value.type === 'boolean') {
        return faker.datatype.boolean();
    } else if (value.type === 'object') {
        return await generateFakeData(value);
    } else if (value.type === 'array' && value.items) {
        return [await generateFakeField(key, value.items)];
    } else if (value.format === 'date-time') {
        return faker.date.recent().toISOString();
    } else if (value.format === 'uuid') {
        return faker.string.uuid();
    } else if (value.format === 'email') {
        return faker.internet.email();
    } else if (value.format === 'url') {
        return faker.internet.url();
    } else if (value.format === 'ipv4') {
        return faker.internet.ip();
    } else if (value.format === 'ipv6') {
        return faker.internet.ipv6();
    } else {
        return null;
    }
}

async function generateFakeData(schema) {
    const data = {};

    if (schema && schema.properties) {
        for (const [key, value] of Object.entries(schema.properties)) {
            data[key] = await generateFakeField(key, value);
        }
    }

    return data;
}

module.exports = {
    fieldFakerMapping,
    generateFakeField,
    generateFakeData
};