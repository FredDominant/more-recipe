import jwt from 'jsonwebtoken';

const authenticateUser = () => {
  const token = localStorage.getItem('token');
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
export default authenticateUser;
