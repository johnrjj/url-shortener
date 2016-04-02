const CHARACTER_SET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const encode = (integer) => {
  let integerToIterate = integer || 0;
  if (integerToIterate === 0) {return '0';}
  let s = '';
  while (integerToIterate > 0) {
    s = CHARACTER_SET[integerToIterate % 62] + s;
    integerToIterate = Math.floor(integerToIterate / 62);
  }
  return s;
};

const decode = (base62String) => {
  const base62Chars = base62String.split('').reverse();
  return base62Chars.reduce((decoded, character, index) =>
    decoded + (CHARACTER_SET.indexOf(character) * Math.pow(62, index))
  , 0);
};

export { encode, decode };
