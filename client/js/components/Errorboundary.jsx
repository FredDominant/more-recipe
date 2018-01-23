import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';

/**
 *
 *
 * @class ErrorBoundary
 * @extends {Component}
 */
class Errorboundary extends React.Component {
/**
 * Creates an instance of ErrorBoundary.
 * @param {any} props
 * @memberof ErrorBoundary
 */
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  /**
   * @returns {null} null
   * @param {any} error
   * @param {any} info
   * @memberof Errorboundary
   */
  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }
  /**
   *
   * @returns {null} null
   * @memberof Errorboundary
   */
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <br />
          <div className="container">
            <h3>An Error has ocurred. Please try again later</h3>
          </div>
          <Footer />
        </div>
      );
    }
    return this.props.children;
  }
}
Errorboundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default Errorboundary;
