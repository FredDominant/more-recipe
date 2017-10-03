import jwt from 'jsonwebtoken';

const authorize = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'Arsenal', ((error, decoded) => {
      if (error) {
        return res.status(403)
          .json({
            status: 'fail',
            message: 'Unable to verify token'
          });
      }
      req.decoded = decoded;
      next();
    }));
  } else {
    return res.status(403)
      .json({
        status: 'Fail',
        message: 'Failed to provide token'
      });
  }
};

export default authorize;

