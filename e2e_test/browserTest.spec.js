const { signupDetails, recipeDetails, secondRecipe } = require('./mockData');

module.exports = {
  'Render home page correctly': (browser) => {
    browser
      .url('http://localhost:5050')
      .waitForElementVisible('body', 5000)
      .assert.title('More-Recipes')
      .assert.visible('.navbar')
      .assert.visible('.search-body')
      .assert.visible('.carousels')
      .assert.visible('.recipes')
      .assert.containsText('.emptyContent', 'There are currently no recipes in the catalogue')
      .assert.visible('.footer')
      .pause(1000);
  },
  'User proceeds to sign up and sees modal with fields': (browser) => {
    browser
      .click('#register-modal')
      .waitForElementVisible('#register', 5000)
      .assert.containsText('#signup-title', 'More Recipes')
      .assert.visible('input[name=firstName]')
      .assert.visible('input[name=lastName]')
      .pause(1000);
  },
  'User signs up without first and last names': (browser) => {
    browser
      .click('#register-modal')
      .waitForElementVisible('#register', 5000)
      .assert.containsText('#signup-title', 'More Recipes')
      .setValue('#signup-email', signupDetails.email)
      .setValue('#signup-password', signupDetails.password)
      .click('#register-button')
      .waitForElementVisible('div.alert-danger', 5000)
      .assert.containsText('div.alert-danger', 'First Name should be alphabets')
      .pause(1000);
  },
  'User signs up with unmatching passwords': (browser) => {
    browser
      .click('#register-modal')
      .waitForElementVisible('#register', 5000)
      .assert.containsText('#signup-title', 'More Recipes')
      .setValue('input[name=firstName]', signupDetails.firstName)
      .setValue('input[name=lastName]', signupDetails.lastName)
      .click('#register-button')
      .waitForElementVisible('div.alert-danger', 5000)
      .assert.containsText('div.alert-danger', 'Passwords don\'t match')
      .pause(1000);
  },
  'User signs up with valid details': (browser) => {
    browser
      .click('#register-modal')
      .waitForElementVisible('#register', 5000)
      .assert.containsText('#signup-title', 'More Recipes')
      .setValue('#signup-confirmPassword', signupDetails.password)
      .click('#register-button')
      .pause(500)
      .assert.title('More-Recipes')
      .assert.visible('.navbar')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000)
      .pause(1000);
  },
  'User signs up successfully and proceeds to logout': (browser) => {
    browser
      .assert.visible('#user-menu')
      .click('#user-menu')
      .assert.visible('#user-logout')
      .click('#user-logout')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .assert.visible('#register-modal')
      .pause(1000);
  },
  'User then tries to log in with invalid details': (browser) => {
    browser
      .waitForElementNotPresent('div.toast.toast-success', 50000)
      .click('#login-modal')
      .waitForElementVisible('#user-login-button', 5000)
      .click('#user-login-button')
      .waitForElementVisible('div.alert-danger', 5000)
      .assert.containsText('div.alert-danger', 'Invalid Email')
      .pause(1000)
      .setValue('#login-email', signupDetails.email)
      .click('#user-login-button')
      .waitForElementVisible('div.alert-danger', 5000)
      .assert.containsText('div.alert-danger', 'Password is required')
      .pause(500)
      .setValue('#login-password', 'wrongPassword')
      .click('#user-login-button')
      .waitForElementVisible('div.alert-danger', 5000)
      .assert.containsText('div.alert-danger', 'Invalid login credentials')
      .pause(500);
  },
  'User logins successfully': (browser) => {
    browser
      .clearValue('#login-password')
      .setValue('#login-password', signupDetails.password)
      .click('#user-login-button')
      .assert.title('More-Recipes')
      .assert.visible('.navbar')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000)
      .pause(100);
  },
  'User proceeds to view profile': (browser) => {
    browser
      .assert.visible('#user-menu')
      .click('#user-menu')
      .assert.visible('#user-profile')
      .click('#user-profile')
      .waitForElementVisible('.navbar', 200)
      .pause(1000)
      .assert.visible('#profile-firstName')
      .assert.visible('#profile-lastName')
      .assert.visible('#profile-email')
      .assert.visible('#profile-password')
      .assert.visible('#profile-confirmPassword')
      .assert.visible('#edit')
      .assert.visible('#update-profile-button')
      .pause(100);
  },
  'User proceeds to update profile': (browser) => {
    browser
      .assert.visible('#edit')
      .click('#edit')
      .clearValue('#profile-lastName')
      .setValue('#profile-lastName', 'LastName')
      .click('#update-profile-button')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000)
      .waitForElementVisible('.navbar', 200)
      .assert.visible('#profile-firstName')
      .assert.visible('#profile-lastName')
      .assert.visible('#profile-email')
      .assert.visible('#profile-password')
      .assert.visible('#profile-confirmPassword')
      .assert.visible('#edit')
      .assert.visible('#update-profile-button')
      .pause(100);
  },
  'User proceeds to update passwords incorrectly': (browser) => {
    browser
      .setValue('#profile-password', '12')
      .setValue('#profile-confirmPassword', '12')
      .click('#update-profile-button')
      .assert.containsText('span.error-text', 'Password must be between 6 and 50 characters')
      .pause(1000);
  },
  'User proceeds to update passwords successfully': (browser) => {
    browser
      .setValue('#profile-password', 'abcdef')
      .setValue('#profile-confirmPassword', 'abcdef')
      .click('#update-profile-button')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000)
      .pause(100)
      .assert.visible('#user-menu')
      .pause(200);
  },
  'User proceeds to add recipe': (browser) => {
    browser
      .click('#user-menu')
      .assert.visible('#user-profile')
      .click('#user-add-recipe')
      .assert.visible('#recipeName')
      .assert.visible('#recipeDescription')
      .assert.visible('#recipeDirections')
      .assert.visible('#recipeIngredients')
      .assert.visible('#add-recipe-button')
      .pause(200);
  },
  'User proceeds to add recipe without recipe details': (browser) => {
    browser
      .assert.visible('#add-recipe-button')
      .click('#add-recipe-button')
      .waitForElementVisible('span.error-text', 5000)
      .assert.containsText('span.error-text', 'Recipe name should be between 2 and 50 characters')
      .pause(200);
  },
  'User proceeds to add recipe with correct details': (browser) => {
    browser
      .assert.visible('#add-recipe-button')
      .setValue('#recipeName', recipeDetails.name)
      .setValue('#recipeDescription', recipeDetails.description)
      .setValue('#recipeDirections', recipeDetails.directions)
      .setValue('#recipeIngredients', recipeDetails.ingredients)
      .click('#add-recipe-button')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000)
      .pause(200);
  },
  'User proceeds to add recipe with the same name': (browser) => {
    browser
      .assert.visible('#add-recipe-button')
      .clearValue('#recipeName')
      .clearValue('#recipeDescription')
      .clearValue('#recipeDirections')
      .clearValue('#recipeIngredients')
      .setValue('#recipeName', recipeDetails.name)
      .setValue('#recipeDescription', 'random decription')
      .setValue('#recipeDirections', 'random directions')
      .setValue('#recipeIngredients', 'recipe, ingredients')
      .click('#add-recipe-button')
      .waitForElementVisible('div.toast.toast-error', 5000)
      .waitForElementNotPresent('div.toast.toast-error', 50000)
      .pause(2000);
  },
  'User proceeds to their recipes page': (browser) => {
    browser
      .click('#user-menu')
      .assert.visible('#user-profile')
      .click('#user-recipes')
      .waitForElementVisible('h2#allRecipes-title', 5000)
      .assert.containsText('h2#allRecipes-title', 'My Recipes')
      .pause(200);
  },
  'User proceeds to the home page then clicks on a recipe': (browser) => {
    browser
      .click('#title')
      .waitForElementVisible('body', 5000)
      .assert.title('More-Recipes')
      .assert.visible('.navbar')
      .pause(2000)
      .click('#recipe-details')
      .pause(200);
  },
  'User adds review to a recipe': (browser) => {
    browser
      .waitForElementVisible('body', 5000)
      .assert.title('More-Recipes')
      .assert.visible('.navbar')
      .assert.containsText('span#upvote-count', '0')
      .assert.containsText('span#downvote-count', '0')
      .pause(200)
      .setValue('#review-form-field', 'Sweeeeeet')
      .click('#add-review-button')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000)
      .pause(200);
  },
  'User adds recipe as favourite': (browser) => {
    browser
      .click('#favourite')
      .assert.title('More-Recipes')
      .waitForElementVisible('.navbar', 2000)
      .pause(200)
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000);
  },
  'User upvotes recipe': (browser) => {
    browser
      .click('#upvote')
      .assert.title('More-Recipes')
      .waitForElementVisible('.navbar', 2000)
      .pause(200)
      .assert.containsText('span#upvote-count', '1')
      .assert.containsText('span#downvote-count', '0')
      .pause(1000);
  },
  'User downvotes recipe': (browser) => {
    browser
      .click('#downvote')
      .assert.title('More-Recipes')
      .waitForElementVisible('.navbar', 2000)
      .pause(200)
      .assert.containsText('span#downvote-count', '1')
      .assert.containsText('span#upvote-count', '0')
      .pause(1000);
  },
  'User proceeds to their favourite recipes page': (browser) => {
    browser
      .click('#user-menu')
      .assert.visible('#user-favourites')
      .click('#user-favourites')
      .waitForElementVisible('h2#allRecipes-title', 5000)
      .assert.containsText('h2#allRecipes-title', 'Favourite Recipes')
      .assert.visible('#remove-favourite')
      .pause(200);
  },
  'User proceeds to remove recipe from favourites page': (browser) => {
    browser
      .click('#user-menu')
      .assert.visible('#user-favourites')
      .click('#user-favourites')
      .waitForElementVisible('h2#allRecipes-title', 5000)
      .assert.containsText('h2#allRecipes-title', 'Favourite Recipes')
      .assert.visible('#remove-favourite')
      .click('#remove-favourite')
      .waitForElementVisible('.react-confirm-alert', 5000)
      .click('.react-confirm-alert-button-group button:nth-child(2)')
      .pause(200)
      .assert.containsText('.emptyContent', 'You currently have no favourite recipes. Add recipes to favourites')
      .click('body');
  },
  'User proceeds to create new recipe': (browser) => {
    browser
      .click('#user-menu')
      .assert.visible('#user-profile')
      .click('#user-add-recipe')
      .pause(200)
      .setValue('#recipeName', secondRecipe.name)
      .setValue('#recipeDescription', secondRecipe.description)
      .setValue('#recipeDirections', secondRecipe.directions)
      .setValue('#recipeIngredients', secondRecipe.ingredients)
      .click('#add-recipe-button')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000)
      .pause(200);
  },
  'Then proceeds to her recipes page': (browser) => {
    browser
      .click('#user-menu')
      .assert.visible('#user-profile')
      .click('#user-recipes')
      .pause(200)
      .waitForElementVisible('h2#allRecipes-title', 5000)
      .assert.containsText('h2#allRecipes-title', 'My Recipes')
      .pause(1000);
  },
  'User clicks on recipe to update it': (browser) => {
    browser
      .click('.edit-recipe-link')
      .waitForElementVisible('#recipeName', 5000)
      .assert.visible('#updateRecipe-button')
      .assert.visible('#recipeName')
      .assert.visible('#recipeDescription')
      .assert.visible('#recipeDirections')
      .assert.visible('#recipeIngredients');
  },
  'User updates their recipe': (browser) => {
    browser
      .waitForElementVisible('#recipeName', 5000)
      .assert.visible('#updateRecipe-button')
      .assert.visible('#recipeName')
      .assert.visible('#recipeDescription')
      .assert.visible('#recipeDirections')
      .assert.visible('#recipeIngredients')
      .click('#edit')
      .pause(500)
      .clearValue('#recipeName')
      .pause(500)
      .setValue('#recipeName', 'Second awesome recipe')
      .click('#updateRecipe-button')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000);
  },
  'User goes to delete recipe': (browser) => {
    browser
      .click('#user-menu')
      .assert.visible('#user-profile')
      .click('#user-recipes')
      .pause(200)
      .waitForElementVisible('h2#allRecipes-title', 5000)
      .assert.containsText('h2#allRecipes-title', 'My Recipes')
      .pause(1000)
      .click('#deleteRecipe')
      .pause(300)
      .click('.react-confirm-alert-button-group button:nth-child(1)')
      .pause(300);
  },
  'User logs out successfully': (browser) => {
    browser
      .click('#user-menu')
      .assert.visible('#user-profile')
      .pause(300)
      .click('#user-logout')
      .waitForElementVisible('div.toast.toast-success', 5000)
      .waitForElementNotPresent('div.toast.toast-success', 50000)
      .waitForElementVisible('body', 5000)
      .assert.title('More-Recipes')
      .assert.visible('.navbar')
      .assert.visible('.search-body')
      .assert.visible('.carousels')
      .assert.visible('.recipes')
      .assert.containsText('.allRecipes-title', 'Todays Top Three Delicacies')
      .assert.containsText('#all-recipes', 'Other Awesome Recipes')
      .assert.visible('.footer')
      .pause(300);
  },
  'Unauthenticated user proceeds to the home page then clicks on a recipe': (browser) => {
    browser
      .click('#title')
      .waitForElementVisible('body', 5000)
      .assert.title('More-Recipes')
      .assert.visible('.navbar')
      .pause(2000)
      .click('#recipe-details')
      .pause(200)
      .assert.elementNotPresent('span#downvote-count')
      .assert.elementNotPresent('span#upvote-count')
      .assert.elementNotPresent('#remove-favourite')
      .assert.elementNotPresent('#review-form-field')
      .assert.elementNotPresent('#add-review-button')
      .end();
  },
};
