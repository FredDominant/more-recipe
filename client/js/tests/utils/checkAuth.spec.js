import checkAuth from '../../utils/checkAuth';

import { AddRecipePage } from '../../components/AddRecipePage';

describe('checkAuth function should', () => {
  it('work', () => {
    global.token = 'kjsbjbdsbbvsjh';
    expect(checkAuth(AddRecipePage)).toBeTruthy();
  });
  it('work', () => {
    global.userToken = 'kjsbjbdsbbvsjh';
    expect(checkAuth(AddRecipePage)).toBeTruthy();
  });
});
