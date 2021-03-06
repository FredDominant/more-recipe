import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;
const allow = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, ((error, decoded) => {
      if (error) {
        return res.status(401)
          .json({
            Message: 'Unable to verify token'
          });
      }
      req.decoded = decoded;
      next();
    }));
  }
  if (!token) {
    next();
  }
};

export default allow;
