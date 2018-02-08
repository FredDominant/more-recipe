const response = {
  signup: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoiRnJlZCIsImlhdCI6MTUxNzQ5NDM0NiwiZXhwIjoxNTE3NTgwNzQ2fQ.r22EnYNYeeyZbdQIcj6Fa-l-9F9BFXB2KQ2si-nMzF4',
    user: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com'
    },
    message: 'Account created'
  },
  signupData: {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email@email.com',
    password: '123456',
    confirmPassword: '123456'
  },
  login: {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoiRnJlZCIsImlhdCI6MTUxNzQ5NDM0NiwiZXhwIjoxNTE3NTgwNzQ2fQ.r22EnYNYeeyZbdQIcj6Fa-l-9F9BFXB2KQ2si-nMzF4',
    user: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com'
    },
    message: 'You\'re now logged in'
  },
  loginData: {
    email: 'email@email.com',
    password: '123456'
  },
  editprofileWithoutImage: {
    firstName: 'firstname',
    lastName: 'lastname',
    email: 'email@email.com',
    selectedImage: true
  },
  editprofileWithImage: {
    firstName: 'firstname',
    lastName: 'lastname',
    email: 'email@email.com',
    selectedImage: true
  },
  reviews: {
    numberOfItems: 1,
    limit: 6,
    pages: 1,
    currentPage: 1,
    reviews: [
      {
        id: 11,
        content: 'test review for test recipe with custom image',
        userId: 3,
        recipeId: 4,
        createdAt: '2018-01-29T08:52:05.086Z',
        updatedAt: '2018-01-29T08:52:05.086Z',
        User: {
          firstName: 'Tested',
          lastName: 'User',
          imageUrl: '/images/user_avatar.png'
        }
      }
    ]
  },
  singleReview: {
    id: 11,
    content: 'test review for test recipe with custom image',
    userId: 3,
    recipeId: 4,
    createdAt: '2018-01-29T08:52:05.086Z',
    updatedAt: '2018-01-29T08:52:05.086Z',
    User: {
      firstName: 'Tested',
      lastName: 'User',
      imageUrl: '/images/user_avatar.png'
    }
  },
  singleRecipe: {
    id: 1,
    name: 'recipe 1',
    userId: 1,
    description: 'dsfdsgdsf',
    ingredients: 'vfsgrdfasddgsszd',
    directions: 'dfgsagdsfas',
    views: 1,
    upvote: 0,
    downvote: 0,
    picture: 'https://mbqyszjwy9t4pgkbdw9k.jpg',
    createdAt: '2018-01-16T18:02:31.657Z',
    updatedAt: '2018-01-17T18:17:16.943Z',
    User: {
      firstname: 'User',
      lastname: 'Lastname',
      email: 'user@email.com'
    },
  },
  allRecipes: {
    numberOfItems: 3,
    limit: 6,
    pages: 1,
    currentPage: 1,
    recipes: [
      {
        id: 3,
        name: 'recipe 3',
        userId: 1,
        description: 'dsfdsgdsf',
        ingredients: 'vfsgrdfasddgsszd',
        directions: 'dfgsagdsfas',
        views: 0,
        upvote: 2,
        downvote: 0,
        picture: 'https://um5pmccst4o.jpg',
        createdAt: '2018-01-16T18:02:59.391Z',
        updatedAt: '2018-01-17T12:21:54.171Z',
        User: {
          firstname: 'user',
          lastname: 'Lastname',
          picture: 'https://jbfdabhvabb00x600px__1.0_1x.jpg'
        }
      },
      {
        id: 2,
        name: 'recipe 2',
        userId: 1,
        description: 'dsfdsgdsf',
        ingredients: 'vfsgrdfasddgsszd',
        directions: 'dfgsagdsfas',
        views: 0,
        upvote: 1,
        downvote: 0,
        picture: 'https:fjdnjajsbblbas.jpg',
        createdAt: '2018-01-16T18:02:47.167Z',
        updatedAt: '2018-01-16T18:03:28.553Z',
        User: {
          firstname: 'user',
          lastname: 'lastname',
          picture: 'https://ffsjjbb__1.0_1x.jpg'
        }
      }
    ]
  }
};
export default response;
