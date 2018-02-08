import loginValidator from '../../validation/LoginValidator';

describe('Test for', () => {
  describe('login validator should', () => {
    it('work correctly', () => {
      const invalidLogin = {
        email: '',
        password: ''
      };
      expect(loginValidator(invalidLogin).errors).toBeTruthy();
      expect(loginValidator(invalidLogin).errors.email).toEqual('Invalid Email');
      expect(loginValidator(invalidLogin).errors.password).toEqual('Password is required');
    });
  });
});
