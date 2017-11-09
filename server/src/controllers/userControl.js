import jwt from 'jsonwebtoken';
import validate from 'validator';
import models from '../models';
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
   * @returns {obj} obj
   * @memberof User
   */
  static createUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const confirmPassword = req.body.confirmPassword;

    if (!firstname) {
      return res.status(400).json({ message: 'First name field is empty' });
    }
    if (!lastname) {
      return res.status(400).json({ message: 'Lastname field is empty' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password field is empty' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Passwords should be at leats 6 characters' });
    }
    if (!confirmPassword) {
      return res.status(400).json({ message: 'confirmPassword field is empty' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords don\'t match' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email field is empty' });
    }
    if (typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    user.findOne({
      where: { email: req.body.email }
    })
      .catch(() => res.status(500)
        .json({ message: 'A server error ocurred, Please try again later' }))
      .then((existing) => {
        if (!existing) {
          console.log(req.body.password);
          const Password = helper.hashPassword(req.body.password);
          user.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: Password
          }).then((newUser) => {
            const token = jwt.sign({
              id: newUser.id,
              firstname: newUser.firstname,
              lastname: newUser.lastname,
              email: newUser.email,
              notify: newUser.notify
            }, secret, { expiresIn: 86400 });
            return res.status(201)
              .json({
                status: 'success',
                token,
                message: 'Account created'
              });
          }).catch((error) => { return res.status(400)
            .json({
              status: 'fail',
              message: error.message
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
  }

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} obj
   * @memberof User
   */
  static userLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!password) {
      return res.status(400).json({ message: 'Password field is empty' });
    }
    if (!email) {
      return res.status(400).json({ message: 'Email field is empty' });
    }
    user.findOne({
      where: { email: req.body.email }
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
                message: 'You\'re now logged in'
              });
          } else {
            res.status(401)
              .json({
                status: 'fail',
                message: 'Email and password don\'t match'
              });
          }
        } else {
          res.status(401)
            .json({
              status: 'fail',
              message: 'Email not found'
            });
        }
      });
  }
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {obj} any
   * @memberof User
   */
  static updateUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(401)
            .json({ message: 'Unauthorized!' });
        }
        if (foundUser) {
          const update = {
            email: email ? email.trim() : foundUser.dataValues.email,
            password: password ? helper.hashPassword(password) : foundUser.dataValues.password
          };
          foundUser.update(update)
            .then(() => { return res.status(200)
              .json({ message: 'Profile update successful' });
            })
            .catch((error) => {
              console.log(error);
              return res.status(500)
                .json({ message: 'Internal server error. Unable to update profile' });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(500)
          .json({ message: 'Internal server error. Unable to update profile' });
      });
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {obj} any
   * @memberof User
   */
  static deleteUser(req, res) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!password) {
      return res.status(400).json({ message: 'enter a password' });
    }
    if (!confirmPassword) {
      return res.status(400).json({ message: 'confirm Password field is empty' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password\'s do not match' });
    }
    user.findOne({
      where: {
        id: req.decoded.id,
        $and: { email: req.decoded.email }
      }
    }).then((foundUser) => {
      if (!foundUser) {
        return res.status(404).json({ message: 'Unauthorized' });
      }
      const encrypted = helper.hashPassword(password);
      if (foundUser.password === encrypted) {
        user.destroy({
          where: {
            id: req.decoded.id,
            $and: { password: encrypted }
          }
        }).then(() => {
          return res.status(200).json({ message: 'Account deleted' });
        }).catch(() => {
          return res.status(500).json({ message: 'Unable to delete account' });
        });
      } else {
        return res.status(403).json({ message: 'Passwords do not match' });
      }
    }).catch(() => {
      return res.status(500).json({ message: 'Unable to complete request' });
    });
  }
}
