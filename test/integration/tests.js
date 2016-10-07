const Sinon = require('sinon');
const generator = require('../../src/index');
const Chai = require('chai');
Chai.should();

describe('release notes generator', function () {
    this.timeout(5000);
    
    it('should run without blowing up', function (done) {
        generator({}, {
            repository: {
                url: 'git+https://github.com/yamikuronue/release-notes-generator.git'
            }
        }, () => done());
    });
    
    it('should compile notes', (done) => {
        generator({}, {
            repository: {
                url: 'git+https://github.com/yamikuronue/release-notes-generator.git'
            }
        }, (notes) => {
          notes.should.be.a('string');
          notes.should.include('yami style'); //This was committed with Feature: yami style
          done();
        });
    })
})