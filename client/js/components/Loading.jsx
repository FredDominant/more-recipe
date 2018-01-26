import React from 'react';
import MDSpinner from 'react-md-spinner';
import PropTypes from 'prop-types';

/**
 *
 * @class Loading
 *
 * @extends {React.Component}
 */
class Loading extends React.Component {
/**
 * @description Creates an instance of Loading.
 *
 * @param {any} props
 *
 * @memberof Loading
 */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   *
   * @returns {node} jsx
   *
   * @memberof Loading
   */
  render() {
    return (
      <div className="container" >
        <MDSpinner
          color={this.props.color}
          size={this.props.size}
          singleColor={this.props.singleColor}
        />
      </div>
    );
  }
}

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  singleColor: PropTypes.string
};

Loading.defaultProps = {
  color: null,
  size: null,
  singleColor: null
};
export default Loading;
