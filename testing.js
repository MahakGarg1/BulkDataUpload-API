const validator = require('./validator.js');
const expect = require('chai').expect;

describe('Validator', () => {
    it('should validate required fields', (done) => {
      const errors = [];
      const row = {
        username: 'testUser',
        task: 'Test Task',
        status: 'Started',
        processid: 123,
      };
      validator.validateTaskInfo(row, errors, 1);
      expect(errors).to.be.an('array').that.is.empty;
      done();
    });
});