import jwt from 'jsonwebtoken';

const decodeToken = () => {
  const userToken = localStorage.getItem('token') || global.userToken;
  if (userToken) {
    return jwt.verify(userToken, 'ARSENAL', ((error) => {
      if (!error) {
        const user = jwt.decode(userToken);
        return user;
      }
      localStorage.removeItem('token');
      return false;
    }));
  }
};
export default decodeToken;
