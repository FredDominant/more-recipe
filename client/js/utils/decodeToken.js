import jwt from 'jsonwebtoken';

const decodeToken = () => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    return jwt.verify(userToken, 'ARSENAL', ((error, decoded) => {
      if (!error) {
        const user = jwt.decode(userToken);
        return user;
      }
    }));
  }
};
export default decodeToken;
