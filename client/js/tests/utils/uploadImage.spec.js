import uploadImage from '../../utils/uploadImage';

describe('Function to upload image should', () => {
  it('work correctly', (done) => {
    expect(uploadImage('reuruh3888f')).toBeTruthy();
    done();
  });
});
