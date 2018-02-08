import Validator from 'validatorjs';

/**
 * @description This class holds all validation methods/functions
 *
 * @export class Validate
 *
 * @class Validate
 */
export default class Validate {
  /**
   * @description This method validates a parameter, Id
   *
   * @static
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   * @param {function} next Middleware function
   *
   * @returns {object} JSON object and status code
   *
   * @memberof Validate
   */
  static Id(req, res, next) {
    const id = req.params.recipeId;
    if (!id) {
      return res.status(400)
        .json({ message: 'recipeId is required' });
    }
    if (isNaN(id)) {
      return res.status(400)
        .json({ message: 'recipeId is invalid' });
    }
    return next();
  }
  /**
   * This method validates a recipe details
   *
   * @param {request} req HTTP Request
   * @param {response} res HTTP Response
   * @param {function} next recipe directions to cook
   *
   * @returns {object} next or HTTP status code
   *
   * @memberof Validate
   */
  static recipe(req, res, next) {
    const {
      name,
      description,
      directions,
      ingredients
    } = req.body;
    const recipeData = {
      name,
      description,
      directions,
      ingredients
    };
    const recipeRules = {
      name: 'required|string|min:2',
      description: 'required|string|min:5',
      directions: 'required|string|min:5',
      ingredients: 'required|string|min:5'
    };
    const validation = new Validator(recipeData, recipeRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
  /**
   * @description This method validates recipe updates
   *
   * @static
   *
   * @param {request} req HTTP Request
   * @param {response} res HTTP Response
   * @param {function} next Middleware function
   *
   * @returns {object} HTTP Status code or next
   *
   * @memberof Validate
   */
  static updateRecipe(req, res, next) {
    const {
      name,
      description,
      directions,
      ingredients,
      picture
    } = req.body;

    const recipeUpdateData = {
      name,
      description,
      directions,
      ingredients,
      picture
    };
    const recipeUpdateRules = {
      name: 'string|min:2',
      description: 'string|min:5',
      directions: 'string|min:5',
      ingredients: 'string|min:5',
      picture: 'string'
    };
    const validation = new Validator(recipeUpdateData, recipeUpdateRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }

  /**
   * This method validates reviews
   * @static
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   * @param {function} next Middleware function
   *
   * @returns {function} Middleware function or HTTP Status Code
   *
   * @memberof Validate
   */
  static review(req, res, next) {
    const review = req.body.content;
    const reviewData = {
      review
    };
    const reviewRules = {
      review: 'string|required|min:2'
    };
    const validation = new Validator(reviewData, reviewRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
  /**
   * @description this method validates a user signup credentials
   *
   * @static
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   * @param {function} next Middleware function
   *
   * @returns {object} HTTP status code and JSON
   *
   * @memberof Validate
   */
  static userSignup(req, res, next) {
    const {
      email,
      password,
      firstName,
      lastName,
      confirmPassword
    } = req.body;
    const signupData = {
      email,
      password,
      firstName,
      lastName,
      confirmPassword
    };

    const signupRules = {
      email: 'required|string|email',
      password: 'required|min:6',
      firstName: 'required|string|alpha|min:2',
      lastName: 'required|string|alpha|min:2',
      confirmPassword: 'required|min:6'
    };
    if (password !== confirmPassword) {
      return res.status(400)
        .json({ message: 'Passwords don\'t match' });
    }
    const validation = new Validator(signupData, signupRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
  /**
   * @description this method validates a user's login credentials
   *
   * @static
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   * @param {function} next Middleware function
   *
   * @returns {object} Middleware function or JSON
   *
   * @memberof Validate
   */
  static userLogin(req, res, next) {
    const { email, password } = req.body;
    const loginData = {
      email,
      password
    };

    const loginRules = {
      email: 'required|string|email',
      password: 'required|string'
    };

    const validation = new Validator(loginData, loginRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
  /**
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @memberof Validate
   *
   * @returns {next} function
   */
  static updatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (!password) {
      return next();
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    return next();
  }
  /**
   *
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @returns {function} middleware function
   * @memberof Validate
   */
  static updateUser(req, res, next) {
    const { email, password, firstName, lastName, imageUrl } = req.body;
    const userUpdateData = {
      email,
      password,
      firstName,
      lastName,
      imageUrl
    };
    const userUpdateRules = {
      email: 'string|email',
      password: 'string|min:6',
      firstName: 'string|min:2|alpha',
      lastName: 'string|min:2|alpha',
      imageUrl: 'string'
    };
    const validation = new Validator(userUpdateData, userUpdateRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
  /**
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @memberof Validate
   * @returns {Response} HTTP Response
   */
  static recoverEmail(req, res, next) {
    const { email } = req.body;
    const validateData = { email };
    const validateRules = {
      email: 'required|email'
    };
    const validation = new Validator(validateData, validateRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
  /**
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   *
   * @memberof Validate
   *
   * @returns {Response} HTTP Response
   */
  static resetPassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400)
        .json({ message: 'Passwords don\'t match' });
    }
    const resetPasswordDetails = {
      password,
      confirmPassword
    };
    const validateRules = {
      password: 'string|min:6',
      confirmPassword: 'string|min:6'
    };
    const validation = new Validator(resetPasswordDetails, validateRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
}
