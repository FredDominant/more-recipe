import jwt from 'jsonwebtoken';

const verifyRecoveryToken = (token) => {
  if (token) {
    return jwt.verify(token, 'ARSENAL', ((error) => {
      if (error) {
        return false;
      }
      return true;
    }));
  }
  return false;
};
export default verifyRecoveryToken;
