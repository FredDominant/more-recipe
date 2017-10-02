import bcrypt from 'bcrypt';


/**
 * 
 * 
 * @export
 * @class PasswordHelper
 */
export default class PasswordHelper {
  /**
   * 
   * 
   * @param {any} password 
   * @returns hash
   * @memberof PasswordHelper
   */
  hashPassword(password) {
    this.salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, this.salt);
    return hash;
  }
  /**
   * 
   * 
   * @param {any} password 
   * @param {any} hash 
   * @memberof PasswordHelper
   */

  /**
	 * 
	 * 
	 * @param {any} password 
	 * @param {any} hash 
	 * @returns 
	 * @memberof PasswordHelper
	 */
  decrypt(password, hash) {
    this.status = bcrypt.compareSync(password, hash);
    return this.status;
  }
}

/* const passwordHelper = {
  hashPassword: (password) => {
    console.log('Password here is', password);
    bcrypt.hash(password, 10, ((error, hash) => {
      if (error) {
        res.status(500)
          .send(error);
      } else {
        return hash;
      }
    }));
  },
  decrypt: (password, hash, res) => {
    bcrypt.compare(password, hash)
      .catch(() => {
        res.status(500)
          .send('Ops! a server error occured. Please try again later');
      })
      .then((res) => {
        if (res === true) {
          return true;
        }
        return false;
      });
  }
};

export default passwordHelper; */
