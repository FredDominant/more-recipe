const capitalize = (word) => {
  const nameList = word.split('');
  nameList[0] = nameList[0].toUpperCase();
  return nameList.join('');
};
export default capitalize;
