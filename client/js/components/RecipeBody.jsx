import React from 'react';
import { connect } from 'react-redux';

import RecipeItem from './RecipeItem';
import getAllRecipes from '../actions/getAllRecipes';
/**
 * @description this class displays RecipeItem components
 *
 * @class RecipeBody
 * @extends {React.Component}
 */
class RecipeBody extends React.Component {
  /**
     * Creates an instance of RecipeBody.
     * @param {any} props
     * @memberof RecipeBody
     */
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    console.log('I work');
    this.props.dispatch(getAllRecipes());
  }
  render() {
    return (
      <div className="row recipes-body">
        <div className="col-sm-4">
          <RecipeItem />
        </div>
        <div className="col-sm-4">
          <RecipeItem />
        </div>
        <div className="col-sm-4">
          <RecipeItem />
        </div>
      </div>
    );
  }
}
export default connect(null)(RecipeBody);
