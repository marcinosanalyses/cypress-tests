const genRandomString = (length) => {
    let text = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789.-_';
    for (let itr = 0; itr < length; itr++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
const genRandomNumber = (length) => {
    let text = '';
    const possible = '0123456789';
    for (let itr = 0; itr < length; itr++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  export default {
    genRandomString,
    genRandomNumber
  };