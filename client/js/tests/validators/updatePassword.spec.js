import updatePassword from '../../validation/updatePasswordValidator';

describe('FUnction to validate password update details should', () => {
  it('work correctly provided details are valid', () => {
    const password = '1234567';
    const confirmPassword = '1234567';
    expect(updatePassword(password, confirmPassword).errors).toEqual({});
    expect(updatePassword(password, confirmPassword).isValid).toEqual(true);
  });

  it('return invalid if passwords do not match', () => {
    const password = '1234567ppp';
    const confirmPassword = '1234567';
    expect(updatePassword(password, confirmPassword).errors).toBeTruthy();
    expect(updatePassword(password, confirmPassword).errors.password).toEqual('Passwords don\'t match');
    expect(updatePassword(password, confirmPassword).errors.confirmPassword).toEqual('Passwords don\'t match');
    expect(updatePassword(password, confirmPassword).isValid).toEqual(false);
  });

  it('return invalid if passwords are less than 6 characters', () => {
    const password = '1';
    const confirmPassword = '';
    expect(updatePassword(password, confirmPassword).errors).toBeTruthy();
    expect(updatePassword(password, confirmPassword).isValid).toEqual(false);
  });
});
