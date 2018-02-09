import jwt from 'jsonwebtoken';

import models from '../models';
import * as passwordHelper from '../functions/encrypt';
import sendEmail from '../functions/sendEmail';

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
   * @description Takes in request and response as parameters and returns an object
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   *
   * @returns {object} object with message and status code
   *
   * @memberof User
   */
  static createUser(req, res) {
    const {
      email,
      password,
      firstName,
      lastName
    } = req.body;

    user.findOne({
      where: { email }
    })
      .then((existingUser) => {
        if (!existingUser) {
          const Password = helper.hashPassword(password);
          user.create({
            firstName,
            lastName,
            email,
            password: Password
          }).then((newUser) => {
            const token = jwt.sign({
              id: newUser.id,
              firstname: newUser.firstName
            }, secret, { expiresIn: 86400 });
            return res.status(201)
              .json({
                token,
                user: {
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  email: newUser.email
                },
                message: 'Account created'
              });
          }).catch(() => res.status(503)
            .json({
              message: 'Unable to create new user. Please try again later'
            }));
        } else {
          return res.status(401)
            .json({
              message: 'Email already registered'
            });
        }
      });
  }

  /**
   * @description This function handles a user log in
   *
   * @param {request} req HTTP parameter
   * @param {response} res HTTP parameter
   *
   * @returns {object} JSON
   *
   * @memberof User
   */
  static userLogin(req, res) {
    const { email, password } = req.body;
    user.findOne({
      where: { email }
    })
      .then((foundUser) => {
        if (foundUser) {
          const result = helper.decrypt(password, foundUser.dataValues.password);
          if (result) {
            const token = jwt.sign({
              id: foundUser.dataValues.id,
              firstname: foundUser.dataValues.firstName
            }, secret, { expiresIn: 86400 });
            res.status(200)
              .json({
                token,
                user: {
                  firstName: foundUser.dataValues.firstName,
                  lastName: foundUser.dataValues.lastName,
                  email: foundUser.dataValues.email
                },
                message: 'You\'re now logged in'
              });
          } else {
            res.status(401)
              .json({
                message: 'Invalid login credentials'
              });
          }
        } else {
          res.status(401)
            .json({
              message: 'Invalid login credentials'
            });
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal server error' }));
  }
  /**
   * @description This takes in reques, and response to update a user's details
   *
   * @param {request} req HTTP request parameter
   * @param {response} res HTTP response parameter
   *
   * @returns {object} JSON
   *
   * @memberof User
   */
  static updateUser(req, res) {
    const {
      email,
      password,
      firstName,
      lastName,
      imageUrl
    } = req.body;
    user.findOne({
      where: { email }
    }).then((foundUserEmail) => {
      if (foundUserEmail && (foundUserEmail.id !== req.decoded.id)) {
        return res.status(403).json({ message: 'Email already in use' });
      }
      return user.findOne({
        where: {
          id: req.decoded.id
        }
      })
        .then((foundUser) => {
          if (foundUser) {
            const newData = {
              email: email ? email.trim() : foundUser.dataValues.email,
              password: password ? helper.hashPassword(password) : foundUser.dataValues.password,
              firstName: firstName ? firstName.trim() : foundUser.dataValues.firstName,
              lastName: lastName ? lastName.trim() : foundUser.dataValues.lastName,
              imageUrl: imageUrl ? imageUrl.trim() : foundUser.dataValues.imageUrl
            };
            foundUser.update(newData)
              .then(() => {
                user.findOne({
                  where: {
                    id: req.decoded.id
                  },
                  attributes: ['firstName', 'lastName', 'email', 'id', 'imageUrl']
                })
                  .then(currentUser => res.status(200).json({ user: currentUser }));
              });
          }
        })
        .catch(error => res.status(500)
          .json({ message: 'Internal server error. Unable to update profile', error }));
    });
  }
  /**
   *
   * @returns {object} JSON and HTTP Response
   *
   * @static
   *
   * @param {object} req
   * @param {onject} res
   *
   * @memberof User
   */
  static userProfile(req, res) {
    user.findOne({
      where: {
        id: req.decoded.id
      },
      attributes: ['firstName', 'lastName', 'email', 'id', 'imageUrl']
    })
      .then(currentUser => res.status(200).json({ user: currentUser }))
      .catch(() => res.status(500).json({ message: 'Internal server error' }));
  }
  /**
   * @description checks if email sent is registered/in database
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof User
   *
   * @returns {res} HTTP Response
   */
  static verifyEmail(req, res) {
    user.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((foundUser) => {
        if (foundUser) {
          const token = jwt.sign({
            id: foundUser.dataValues.id
          }, secret, { expiresIn: 86400 });
          foundUser.update({ token })
            .then(() => {
              const url = `http://${req.headers.host}/user/password-reset/${token}`;
              sendEmail(url, foundUser.dataValues.email, res);
            });
        } else {
          return res.status(404).json({ message: 'Email not found' });
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error. Plaease try again' }));
  }
  /**
   *
   * @returns {null} null
   *
   * @static
   *
   * @param {any} req
   * @param {any} res
   *
   * @memberof User
   */
  static ResetPassword(req, res) {
    const { password } = req.body;
    user.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((foundUser) => {
        if (foundUser.dataValues.token === req.headers['x-access-token']) {
          const updateDetails = {
            password: helper.hashPassword(password),
            token: null
          };
          foundUser.update(updateDetails)
            .then(() => res.status(200).json({ message: 'Password reset successful' }));
        } else {
          return res.status(403).json({ message: 'You`re unauthorized to perform this action' });
        }
      })
      .catch(() => res.status(500).json({ message: 'Internal server error' }));
  }
}
