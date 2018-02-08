import recoverPassword from '../../validation/recoverPasswordValidator';

describe('Function to validate password recovery data should', () => {
  it('should be valid for a valid email', () => {
    const emailData = { email: 'random@email.com' };
    expect(recoverPassword(emailData).errors).toEqual({});
    expect(recoverPassword(emailData).isValid).toEqual(true);
  });
  it('should be invalid if email is not provided', () => {
    const emailData = {
      email: ''
    };
    expect(recoverPassword(emailData).errors).toBeTruthy();
    expect(recoverPassword(emailData).isValid).toEqual(false);
    expect(recoverPassword(emailData).errors.email).toEqual('Invalid Email');
  });
});
