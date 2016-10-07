const Sinon = require('sinon');
const generator = require('../../src/index');

describe('release notes generator', function () {
    this.timeout(5000);
    
    it('should run without blowing up', function (done) {
        generator({}, {
            repository: {
                url: 'git+https://github.com/yamikuronue/release-notes-generator.git'
            }
        }, done);
    });
})