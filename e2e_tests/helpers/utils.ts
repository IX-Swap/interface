import moment = require("moment");

export const getRandomString = (text: string) => {
  const number = Math.round(Math.random() * 10000);
  return `${text}+${number}`
};

export const getRandomUrl = (text: string) => {
  const number = Math.round(Math.random() * 10000000);
  return `https://${text}${number}.com`
};

export const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomEmail = () => {
  const randomPrefix = getRandomString('email');
  return `${randomPrefix}@altyuitests4.mail7.io`
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const hexToRgb = (hex) => {
  const rgb = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16));

  return `rgb(${rgb.join(", ")})`
};

export const rgbToHex = (r, g, b) => {
  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex
  }).join('');

  return rgbToHex(r, g, b);
};

export const getCurrentDate = () => {
  return moment().format("DD MMM YYYY")
};

export const addToCurrentDate = (amount, type, format) => {
  return format === undefined ? moment().add(amount, type).format() : moment().add(amount, type).format(format)
};

export const subtractFromCurrentDate = (amount, type, format) => {
  return format === undefined ? moment().subtract(amount, type).format() : moment().subtract(amount, type).format(format)
};

export const deepCopyObject = (object) => {
  return JSON.parse(JSON.stringify(object))
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomNumberWithDecimal = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let decimalNumber = Math.floor(Math.random() * (max - min + 1)) + min + 0.41;

  if (decimalNumber > max) decimalNumber = max;

  return decimalNumber;
};
