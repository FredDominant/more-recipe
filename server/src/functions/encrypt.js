import bcrypt from 'bcrypt';


/**
 *
 * @export
 * @class PasswordHelper
 */
export default class PasswordHelper {
  /**
   * @description hashes password
   *
   * @param {string} password
   *
   * @returns {hash} hashed password
   *
   * @memberof PasswordHelper
   */
  hashPassword(password) {
    this.salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, this.salt);
    return hash;
  }

  /**
 * @description compares password to hash
 *
 * @param {string} password
 * @param {any} hash
 *
 * @returns {boolean} true or false
 *
 * @memberof PasswordHelper
 */
  decrypt(password, hash) {
    this.status = bcrypt.compareSync(password, hash);
    return this.status;
  }
}

