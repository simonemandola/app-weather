export const emailPattern = new RegExp(
  "^[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~](\\.?[-!#$%&'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$"
);

export const checkRegExpPattern = (pattern, model) => {
  return pattern.test(model);
};
