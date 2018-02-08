import jwt from 'jsonwebtoken';

import authenticateUser from '../../utils/authenticateUser';

describe('Function to authenticate user should', () => {
  it('should return false is not token is passed', () => {
    expect(authenticateUser()).toEqual(false);
  });
  it('should return false for invalid token', () => {
    global.token = 'fkjbvbabsvbaibsviiuiu';
    expect(authenticateUser()).toEqual(false);
  });
  it('should return true for valid token', () => {
    global.token = jwt.sign({ name: 'name' }, 'ARSENAL', { expiresIn: 86400 });
    expect(authenticateUser()).toEqual(true);
  });
});
