var assert = require("assert"),
    should = require('should'),
    { anonymizeObject, setAnonymization, isAnonymizationEnabled } = require('../lib/anonymizer');

describe('Anonymization Tests for JSON Data', () => {
    const exampleJson = {
        "email": "YujunLiu@example.com",
        "name": "Yujun Liu",
        "address": {
            "street": "22 Bond St",
            "city": "New York",
            "state": "NY",
            "zip": "10012",
            "country": "USA"
        },
        "phone": "+1-555-123-4567",
        "date_of_birth": "1990-05-15",
        "gender": "Male",
        "occupation": "Software Engineer",
        "company": {
            "name": "Tech Solutions Inc.",
            "address": {
                "street": "1500 Broadway",
                "city": "New York",
                "state": "NY",
                "zip": "10036",
                "country": "USA"
            },
            "position": "Senior Developer"
        },
        "social_media": {
            "linkedin": "https://linkedin.com/in/yujunliu",
            "twitter": "https://twitter.com/yujunliu"
        },
        "hobbies": ["coding", "reading", "hiking"],
        "education": {
            "degree": "Bachelor of Science in Computer Science",
            "university": "New York University",
            "graduation_year": 2012
        },
        "skills": [
            "JavaScript",
            "Python",
            "Java",
            "SQL",
            "React",
            "Node.js"
        ],
        "certifications": [
            {
                "name": "Certified Java Developer",
                "issuing_organization": "Oracle",
                "issue_date": "2015-06-01"
            },
            {
                "name": "AWS Certified Solutions Architect",
                "issuing_organization": "Amazon",
                "issue_date": "2017-11-01"
            }
        ]
    };

    before(function() {
        setAnonymization(true)
    });

    it('should anonymize the email', () => {
        const anonymizedJson = anonymizeObject({ ...exampleJson });
        anonymizedJson.email.should.equal('anonymized_email@example.com');
    });

    it('should anonymize the name', () => {
        const anonymizedJson = anonymizeObject({ ...exampleJson });
        anonymizedJson.name.should.equal('Anonymized Name');
    });

    it('should anonymize the street address', () => {
        const anonymizedJson = anonymizeObject({ ...exampleJson });
        anonymizedJson.address.street.should.equal('Anonymized Address');
    });

    it('should anonymize the city', () => {
        const anonymizedJson = anonymizeObject({ ...exampleJson });
        anonymizedJson.address.city.should.equal('Anonymized Address');
    });

    it('should anonymize the state', () => {
        const anonymizedJson = anonymizeObject({ ...exampleJson });
        anonymizedJson.address.state.should.equal('XX');
    });

    it('should anonymize the zip code', () => {
        const anonymizedJson = anonymizeObject({ ...exampleJson });
        anonymizedJson.address.zip.should.equal('00000');
    });

    it('should anonymize the phone number', () => {
        const anonymizedJson = anonymizeObject({ ...exampleJson });
        anonymizedJson.phone.should.equal('000-000-0000');
    });

    it('should anonymize URLs', () => {
        const anonymizedJson = anonymizeObject({ ...exampleJson });
        anonymizedJson.social_media.linkedin.should.equal('https://anonymized-url.com');
        anonymizedJson.social_media.twitter.should.equal('https://anonymized-url.com');
    });

    it('should respect the feature flag', () => {
        setAnonymization(false);
        const nonAnonymizedJson = anonymizeObject({ ...exampleJson });
        nonAnonymizedJson.email.should.equal(exampleJson.email);
        setAnonymization(true);
    });
});
