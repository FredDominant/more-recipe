import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';

/**
 *
 * @class ErrorBoundary
 *
 * @extends {Component}
 */
class Errorboundary extends React.Component {
/**
 * @description Creates an instance of ErrorBoundary.
 *
 * @memberof ErrorBoundary
 *
 * @param {object} props
 */
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  /**
   * @memberof Errorboundary
   *
   * @returns {null} null
   *
   */
  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }
  /**
   *
   * @memberof Errorboundary
   *
  * @return {ReactElement} markup
   */
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <br />
          <div className="container">
            <h3 className="text-center allRecipes-title">
              An Error has ocurred. Please try again later
            </h3>
            <br />
          </div>
          <br />
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
