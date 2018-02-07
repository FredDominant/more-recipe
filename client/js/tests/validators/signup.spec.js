import SignupValidator from '../../validation/SignupValidator';

describe('signup validator should', () => {
  it('work correctly', () => {
    const invalidSignup = {
      firstName: '',
      lastName: 'name',
      email: 'email@email.com',
      password: '',
      confirmPassword: ''
    };
    expect(SignupValidator(invalidSignup).errors).toBeTruthy();
    expect(SignupValidator(invalidSignup).errors.email).toBeFalsy();
    expect(SignupValidator(invalidSignup).errors.password).toEqual('Password should be at least 6 characters');
    expect(SignupValidator(invalidSignup).isValid).toEqual(false);
  });

  it('return invalid if password do not match', () => {
    const unmatchingPasswords = {
      firstName: 'firstname',
      lastName: 'lastName',
      email: 'emailemail.com',
      password: '1234567',
      confirmPassword: '12345678'
    };
    expect(SignupValidator(unmatchingPasswords).errors).toBeTruthy();
    expect(SignupValidator(unmatchingPasswords).errors.email).toEqual('Invalid Email');
    expect(SignupValidator(unmatchingPasswords).errors.password).toEqual('Passwords don\'t match');
    expect(SignupValidator(unmatchingPasswords).isValid).toEqual(false);
  });

  it('return invalid if password do not match', () => {
    const unmatchingPasswords = {
      firstName: '',
      lastName: '!ehgfgeu',
      email: '',
      password: '1234567',
      confirmPassword: '1234567'
    };
    expect(SignupValidator(unmatchingPasswords).errors.lastName).toEqual('Last Name should be alphabets');
    expect(SignupValidator(unmatchingPasswords).errors).toBeTruthy();
    expect(SignupValidator(unmatchingPasswords).errors.lastName).toBeTruthy();
    expect(SignupValidator(unmatchingPasswords).isValid).toEqual(false);
  });

  it('return invalid if password do not match', () => {
    const unmatchingPasswords = {
      firstName: '',
      lastName: '',
      email: '',
      password: '1234567',
      confirmPassword: '1234567'
    };
    expect(SignupValidator(unmatchingPasswords).errors.lastName).toEqual('Last Name is required');
    expect(SignupValidator(unmatchingPasswords).errors).toBeTruthy();
    expect(SignupValidator(unmatchingPasswords).errors.lastName).toBeTruthy();
    expect(SignupValidator(unmatchingPasswords).isValid).toEqual(false);
  });
});
