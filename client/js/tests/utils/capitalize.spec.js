import capitalize from '../../utils/capitalize';

describe('Test for capitalize function', () => {
  it('should work correctly', (done) => {
    expect(capitalize('capitalize')).toEqual('Capitalize');
    expect(capitalize('capitalize').length).toBe(10);
    done();
  });
  it('should return passed in word if word is not an alphabet', (done) => {
    expect(capitalize('111111')).toEqual('111111');
    expect(capitalize('111111').length).toBe(6);
    done();
  });
  it('should work for numbers', (done) => {
    expect(capitalize(123)).toEqual('123');
    done();
  });
});
