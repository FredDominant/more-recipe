import resetPassword from '../../validation/resetPasswordValidator';

describe('Reset password validator should', () => {
  it('work correctly', () => {
    const resetpasswordDetails = {
      password: '',
      confirmPassword: ''
    };
    expect(resetPassword(resetpasswordDetails).errors).toBeTruthy();
    expect(resetPassword(resetpasswordDetails).errors.password).toEqual('Password should be at least 6 characters');
    expect(resetPassword(resetpasswordDetails).isValid).toEqual(false);
  });
  it('return invalid if passwords do not match', () => {
    const resetpasswordDetails = {
      password: '1234567',
      confirmPassword: '1234567889'
    };
    expect(resetPassword(resetpasswordDetails).errors).toBeTruthy();
    expect(resetPassword(resetpasswordDetails).errors.password).toEqual('Passwords don\'t match');
    expect(resetPassword(resetpasswordDetails).isValid).toEqual(false);
  });
});
