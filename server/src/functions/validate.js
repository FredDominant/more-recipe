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
   * @param {next} next Middleware function
   *
   * @returns {object} JSON object and status code
   *
   * @memberof Validate
   */
  static Id(req, res, next) {
    const id = req.params.recipeId;
    if (!id) {
      return res.status(400)
        .json({ Message: 'recipeId is required' });
    }
    if (isNaN(id)) {
      return res.status(400)
        .json({ Message: 'recipeId is invalid' });
    }
    return next();
  }
  /**
   * This method validates a recipe details
   *
   * @param {request} req HTTP Request
   * @param {response} res HTTP Response
   * @param {next} next recipe directions to cook
   *
   * @returns {any} next or HTTP status code
   *
   * @memberof Validate
   */
  static recipe(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const directions = req.body.directions;
    const ingredients = req.body.ingredients;
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
        .json({ Message: errors });
    }
  }
  /**
   * @description This method validates recipe updates
   *
   * @static
   *
   * @param {request} req HTTP Request
   * @param {response} res HTTP Response
   * @param {next} next Middleware function
   *
   * @returns {any} HTTP Status code or next
   *
   * @memberof Validate
   */
  static updateRecipe(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const directions = req.body.directions;
    const ingredients = req.body.ingredients;
    const picture = req.body.recipeImage;
    const recipeUpdateData = {
      name,
      description,
      directions,
      ingredients,
      picture
    };
    const recipeUpdateRules = {
      name: 'required|string|min:2',
      description: 'required|string|min:5',
      directions: 'required|string|min:5',
      ingredients: 'required|string|min:5',
      picture: 'string'
    };
    const validation = new Validator(recipeUpdateData, recipeUpdateRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ Message: errors });
    }
  }

  /**
   * This method validates reviews
   * @static
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   * @param {next} next Middleware function
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
      review: 'string|alpha|required|min:2'
    };
    const validation = new Validator(reviewData, reviewRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ Message: errors });
    }
  }
  /**
   * @description this method validates a user signup credentials
   *
   * @static
   *
   * @param {request} req HTTP request
   * @param {response} res HTTP response
   * @param {next} next Middleware function
   *
   * @returns {object} HTTP status code and JSON
   *
   * @memberof Validate
   */
  static userSignup(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const confirmPassword = req.body.confirmPassword;
    const signupData = {
      email,
      password,
      firstname,
      lastname,
      confirmPassword
    };

    const signupRules = {
      email: 'required|string|email',
      password: 'required|min:6',
      firstname: 'required|string|alpha|min:2',
      lastname: 'required|string|alpha|min:2',
      confirmPassword: 'required|min:6'
    };
    if (password !== confirmPassword) {
      return res.status(400)
        .json({ Message: 'Passwords don\'t match' });
    }
    const validation = new Validator(signupData, signupRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ Message: errors });
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
    const email = req.body.email;
    const password = req.body.password;
    const loginData = {
      email,
      password
    };

    const loginRules = {
      email: 'required|string|required|email',
      password: 'required|string'
    };

    const validation = new Validator(loginData, loginRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ Message: errors });
    }
  }
  /**
   *
   *
   * @static
   *
   * @param {any} req
   *
   * @param {any} res
   *
   * @param {any} next
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
      return res.status(400).json({ Message: 'Passwords do not match' });
    }
    return next();
  }
  /**
   *
   *
   * @static
   *
   * @param {any} req
   * @param {any} res
   * @param {any} next
   *
   * @returns {next} middleware function
   * @memberof Validate
   */
  static updateUser(req, res, next) {
    const { email, password, firstname, lastname, picture } = req.body.email;
    const userUpdateData = {
      email,
      password,
      firstname,
      lastname,
      picture
    };
    const userUpdateRules = {
      email: 'string|email',
      password: 'string|min:6',
      firstname: 'string|min:2|alpha',
      lastname: 'string|min:2|alpha',
      picture: 'string'
    };
    const validation = new Validator(userUpdateData, userUpdateRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ Message: errors });
    }
  }
  /**
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @memberof Validate
   * @returns {Response} HTTP Response
   */
  static recoverEmail(req, res, next) {
    const { email } = req.body;
    const validateRules = {
      email: 'required|email'
    };
    const validation = new Validator(email, validateRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ Message: errors });
    }
  }
  /**
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @memberof Validate
   * @returns {Response} HTTP Response
   */
  static resetPassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400)
        .json({ Message: 'Passwords don\'t match' });
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
        .json({ Message: errors });
    }
  }
}
