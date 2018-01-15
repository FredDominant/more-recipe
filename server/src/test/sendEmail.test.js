import chai from 'chai';

import sendEmail from '../functions/sendEmail';

const expect = chai.expect;

describe('Test for SendEmail', () => {
  it('should return 200 if valid details are passed', (done) => {
    expect(sendEmail('randomUrl', 'random@email.com'));
  });
});
