import jwt from 'jsonwebtoken';

const decodeToken = () => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    return jwt.verify(userToken, 'ARSENAL', ((error) => {
      if (!error) {
        const user = jwt.decode(userToken);
        return user;
      }
      return localStorage.removeItem('token');
    }));
  }
};
export default decodeToken;
