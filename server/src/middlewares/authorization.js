import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;
const authorize = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, ((error, decoded) => {
      if (error) {
        return res.status(401)
          .json({
            message: 'Unable to verify token'
          });
      }
      req.decoded = decoded;
      next();
    }));
  } else {
    return res.status(401)
      .json({
        message: 'Failed to provide token'
      });
  }
};

export default authorize;

