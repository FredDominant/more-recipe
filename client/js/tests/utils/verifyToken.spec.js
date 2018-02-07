import jwt from 'jsonwebtoken';

import verifyRecoveryToken from '../../utils/verifyRecoveryToken';

describe('Function to verify Recovery token should', () => {
  it('work correctly', () => {
    expect(verifyRecoveryToken('random stuff')).toEqual(false);
  });
  it('return false if token is not passed', () => {
    expect(verifyRecoveryToken()).toEqual(false);
  });
  it('return true if token is valid', () => {
    const token = jwt.sign({ firstname: 'firstname' }, 'ARSENAL', { expiresIn: 86400 });
    expect(verifyRecoveryToken(token)).toEqual(true);
  });
});
