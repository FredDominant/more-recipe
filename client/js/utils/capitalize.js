const capitalize = (word) => {
  if (typeof word !== 'string') {
    return word;
  }
  const nameList = word.split('');
  if (typeof nameList[0] !== 'string') {
    return word;
  }
  nameList[0] = nameList[0].toUpperCase();
  return nameList.join('');
};
export default capitalize;
