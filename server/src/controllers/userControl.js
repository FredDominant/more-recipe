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
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    user.findOne({
      where: { email }
    })
      .then((existingUser) => {
        if (!existingUser) {
          const Password = helper.hashPassword(password);
          user.create({
            firstname,
            lastname,
            email,
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
                Token: token,
                User: {
                  FirstName: newUser.email,
                  LastName: newUser.lastname,
                  Email: newUser.email
                },
                Message: 'Account created'
              });
          }).catch(() => res.status(500)
            .json({
              Message: 'Unable to create new user. Please try again later'
            }));
        } else {
          return res.status(401)
            .json({
              Message: 'Email already registered'
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
   * @memberof User
   */
  static userLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({
      where: { email }
    })
      .then((foundUser) => {
        if (foundUser) {
          const result = helper.decrypt(password, foundUser.dataValues.password);
          if (result) {
            const token = jwt.sign({
              id: foundUser.dataValues.id,
              firstname: foundUser.dataValues.firstname,
              lastname: foundUser.dataValues.lastname,
              email: foundUser.dataValues.email,
              notify: foundUser.dataValues.notify
            }, secret, { expiresIn: 86400 });
            res.status(200)
              .json({
                Token: token,
                User: {
                  FirstName: foundUser.dataValues.firstname,
                  LastName: foundUser.dataValues.lastname,
                  Email: foundUser.dataValues.email
                },
                Message: 'You\'re now logged in'
              });
          } else {
            res.status(401)
              .json({
                Message: 'Invalid login credentials'
              });
          }
        } else {
          res.status(401)
            .json({
              Message: 'Invalid login credentials'
            });
        }
      })
      .catch(() => res.status(500).json({ Message: 'Internal server error' }));
  }
  /**
   * @description This takes in reques, and response to update a user's details
   * @param {request} req HTTP request parameter
   * @param {response} res HTTP response parameter
   *
   * @returns {object} JSON
   * @memberof User
   */
  static updateUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const picture = req.body.picture;
    user.findOne({
      where: {
        id: req.decoded.id
      }
    })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(401)
            .json({ Message: 'You\'re not authorized to perform this operation' });
        }
        if (foundUser) {
          const newData = {
            email: email ? email.trim() : foundUser.dataValues.email,
            password: password ? helper.hashPassword(password) : foundUser.dataValues.password,
            firstname: firstname ? firstname.trim() : foundUser.dataValues.firstname,
            lastname: lastname ? lastname.trim() : foundUser.dataValues.lastname,
            picture: picture ? picture.trim() : foundUser.dataValues.picture
          };
          foundUser.update(newData)
            .then(() => {
              user.findOne({
                where: {
                  id: req.decoded.id
                },
                attributes: ['firstname', 'lastname', 'email', 'id', 'picture']
              })
                .then(currentUser => res.status(200).json({ User: currentUser }));
            });
        }
      })
      .catch(() => res.status(500)
        .json({ Message: 'Internal server error. Unable to update profile' }));
  }
  /**
   *
   * @returns {null} null
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof User
   */
  static userProfile(req, res) {
    user.findOne({
      where: {
        id: req.decoded.id
      },
      attributes: ['firstname', 'lastname', 'email', 'id', 'picture']
    })
      .then(currentUser => res.status(200).json({ User: currentUser }))
      .catch(() => res.status(500).json({ Message: 'Internal server error' }));
  }
  /**
   * @description checks if email sent is registered/in database
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof User
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
          return res.status(404).json({ Message: 'Email not found' });
        }
      })
      .catch(() => res.status(500).json({ Message: 'Internal Server Error. Plaease try again' }));
  }
  /**
   *
   * @returns {null} null
   * @static
   * @param {any} req
   * @param {any} res
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
        if (!foundUser) {
          return res.status(400).json({ Message: 'User not found' });
        }
        if (foundUser.dataValues.token === req.headers['x-access-token']) {
          const updateDetails = {
            password: helper.hashPassword(password),
            token: null
          };
          foundUser.update(updateDetails)
            .then(() => res.status(200).json({ Message: 'Password reset successful' }));
        } else {
          return res.status(403).json({ Message: 'You`re unauthorized to perform this action' });
        }
      })
      .catch(() => res.status(500).json({ Message: 'Internal server error' }));
  }
}
