import React from 'react';
import RecipeItem from './RecipeItem';
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
  render() {
    return (
      <div className="container row recipes-body">
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
export default RecipeBody;
