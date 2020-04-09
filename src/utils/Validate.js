export const validateEmail = email => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateEmpty = string => {
  if (string === '') {
    return false;
  }
  return true;
};

export const isValid = item => {
  if (!item) {
    return false;
  }
  if (
    item === '' ||
    item === [] ||
    (typeof item === 'object' && Object.keys(item).length === 0)
  ) {
    return false;
  }
  return true;
};

export const validateCode = code => {
  const re = /\d/;
  const res = code
    .toString()
    .split('')
    .filter(item => {
      return !re.test(item);
    });
  return res.length === 0;
};

export const validatePassword = password => {
  const re = /^\w{6,}$/;
  return re.test(password);
};
export const validateReTypePassword = (password, retype) => {
  if (password !== retype) {
    return false;
  }
  return true;
};
