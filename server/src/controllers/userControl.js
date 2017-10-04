import jwt from 'jsonwebtoken';
import validate from 'validator';
import models from '../models';
import validateSignup from '../functions/validateSignup';
import validateLogin from '../functions/validateLogin';
import * as passwordHelper from '../functions/encrypt';


const helper = new passwordHelper.default();
const user = models.User;
const secret = process.env.SECRET;
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
              }, secret, { expiresIn: 86400 });
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
            }, secret, { expiresIn: 86400 });
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
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof User
   */
  delete(req, res) {
    const password = req.body.password;
    user.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((foundUser) => {
        if (foundUser) {
          const result = helper.decrypt(password, foundUser.dataValues.password);
          if (result) {
            user.destroy({
              where: {
                id: req.decoded.id
              }
            })
              .then(() => res.status(200)
                .send('Your account has been deleted successfully.'))
              .catch(() => {
                res.status(500)
                  .send('Unable to delete account now, please try again later');
              });
          }
        }
      });
    return this;
  }
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @memberof User
   */
  updateUser(req, res) {
    // const firstname = req.body.firstname;
    // const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (!validate.isEmail(email)) {
      return res.status(400)
        .send('Email is not valid');
    }
    if (password !== confirmPassword) {
      return res.status(400)
        .json({
          status: 'Fail',
          message: 'Passwords don\'t match'
        });
    }
    user.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(401)
            .send('Unauthorized!');
        }
        if (foundUser) {
          const Update = {
            email: email.toLowerCase() || foundUser.dataValues.email,
            password: foundUser.dataValues.password || helper.hashPassword(password)
          };
          foundUser.update(Update)
            .then(() => res.status(200)
                .send('Profile update successful'))
            .catch((error) => {
              console.log(error);
              return res.status(500)
                .send('Internal server error. Unable to update profile');
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500)
          .send('Internal server error. Unable to update profile');
      });
    return this;
  }
}
