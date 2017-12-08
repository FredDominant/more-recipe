import React, { Component } from 'react';
/**
 *
 *
 * @class WorkShop
 * @extends {Component}
 */
class WorkShop extends Component {
/**
 * Creates an instance of WorkShop.
 * @param {any} props
 * @memberof WorkShop
 */
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  /**
   *
   *
   * @returns {null} null
   * @memberof WorkShop
   */
  render() {
    return (
      <div>
        <h1>Welcome to our workshop</h1>
      </div>
    );
  }
}

export default WorkShop;
