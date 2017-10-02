import jwt from 'jsonwebtoken';
import models from '../models';
import validateSignup from '../functions/validateSignup';
import validateLogin from '../functions/validateLogin';
import * as passwordHelper from '../functions/encrypt';

const helper = new passwordHelper.default();
const user = models.User;

/**
 * 
 * 
 * @export
 * @class User
 */
export default class User {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof User
   */
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof User
   */
  createUser(req, res) {
    console.log(req.body);
    const { errors, isvalid } = validateSignup(req.body);
    if (!(isvalid)) {
      return res.status(400)
        .json(errors);
    }
    user.findOne({
      where: { email: req.body.email.toLowerCase() }
    })
      .catch(() => res.status(500)
        .send('A server error ocurred, Please try again later'))
      .then((existing) => {
        if (!existing) {
          console.log(req.body.password);
          const Password = helper.hashPassword(req.body.password);
          user.create({
            firstname: req.body.firstname.toLowerCase(),
            lastname: req.body.lastname.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: Password
          })
            .catch(error => res.status(500)
              .json({
                status: 'fail',
                message: error
              }))
            .then((newUser) => {
              const token = jwt.sign({
                id: newUser.dataValues.id,
                firstname: newUser.dataValues.firstname,
                lastname: newUser.dataValues.lastname,
                email: newUser.dataValues.email,
                notify: newUser.dataValues.notify
              }, 'Arsenal', { expiresIn: 86400 });
              // send user a welcome email
              return res.status(201)
                .json({
                  status: 'success',
                  token,
                  user: newUser
                });
            });
        } else {
          return res.status(403)
            .json({
              status: 'Fail',
              message: 'User with email already exists'
            });
        }
      });
    return this;
  }
  
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof User
   */
  userLogin(req, res) {
    const { errors, isvalid } = validateLogin(req.body);
    if (!(isvalid)) {
      return res.status(400)
        .json(errors);
    }
    user.findOne({
      where: { email: req.body.email.toLowerCase() }
    })
      .then((foundUser) => {
        if (foundUser) {
          const result = helper.decrypt(req.body.password, foundUser.dataValues.password);
          if (result) {
            const token = jwt.sign({
              id: foundUser.dataValues.id,
              firstname: foundUser.dataValues.firstname,
              lastname: foundUser.dataValues.lastname,
              email: foundUser.dataValues.email
            }, 'Arsenal', { expiresIn: 86400 });
            res.status(200)
              .json({
                status: 'success',
                token,
                foundUser
              });
          } else {
            res.status(401)
              .json({
                status: 'fail',
                message: 'Email and password don\'t match'
              });
          }
        } else {
          res.status(404)
            .json({
              status: 'fail',
              message: `user with email ${req.body.email} not found`
            });
        }
      });
    return this;
  }
}
