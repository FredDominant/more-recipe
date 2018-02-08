import jwt from 'jsonwebtoken';
import decodeToken from '../../utils/decodeToken';

describe('Test for decodeToken should', () => {
  it('return false if no token is passed', (done) => {
    expect(decodeToken()).toBeFalsy();
    done();
  });

  it('return false if token is invalid', (done) => {
    global.userToken = 'knfvinsibionebin';
    expect(decodeToken()).toEqual(false);
    done();
  });

  it('return true if token is valid', (done) => {
    global.userToken = jwt.sign({ name: 'name' }, 'ARSENAL', { expiresIn: 86400 });
    expect(decodeToken()).toBeTruthy();
    done();
  });
});
