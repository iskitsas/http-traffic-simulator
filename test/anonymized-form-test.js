var assert = require("assert"),
    should = require('should'),
    { anonymizeFormData, setAnonymization, isAnonymizationEnabled } = require('../lib/anonymizer'),
    stream = require('stream');

describe('Anonymization Tests for Form Data', () => {
    
    before(function() {
        setAnonymization(true)
    });

    it('should anonymize form data', (done) => {
        const formData = `--boundary123\r\nContent-Disposition: form-data; name="first_name"\r\n\r\nJohn\r\n--boundary123\r\nContent-Disposition: form-data; name="last_name"\r\n\r\nDoe\r\n--boundary123\r\nContent-Disposition: form-data; name="email"\r\n\r\njohn.doe@example.com\r\n--boundary123\r\nContent-Disposition: form-data; name="password"\r\n\r\nsecurepassword123\r\n--boundary123\r\nContent-Disposition: form-data; name="profile_picture"; filename="profile.jpg"\r\nContent-Type: image/jpeg\r\n\r\n<binary data of profile.jpg>\r\n--boundary123--\r\n`;

        const req = new stream.PassThrough();
        req.end(formData);

        req.headers = {
            'content-type': 'multipart/form-data; boundary=boundary123'
        };

        anonymizeFormData(req, (err, anonymizedData) => {
            if (err) {
                return done(err);
            }
            console.log(anonymizedData); // Debug log
            anonymizedData.fields.first_name.should.equal('Anonymized Name');
            anonymizedData.fields.last_name.should.equal('Anonymized Name');
            anonymizedData.fields.email.should.equal('anonymized_email@example.com');
            anonymizedData.fields.password.should.equal('anonymized_password');
            done();
        });
    });
});
