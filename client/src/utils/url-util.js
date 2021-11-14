export const getPreviousURL = url => {
  const urlArr = url.split('/');
  urlArr.pop();
  return urlArr.join('/');
};
