import arrToOpts from 'helpers/arrToOpts';
import nationalities from './nationalities';

export * from './countries';
export const MARITAL_STATUSES = ['Married', 'Widowed', 'Separated', 'Single'];
export const MARITAL_STATUSES_OPTS = arrToOpts(MARITAL_STATUSES);
export const GENDERS = ['M', 'F'];
export const GENDERS_OPTS = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
];
export const YES_OR_NO_OPTS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
];

export const ALPHA_NUMERIC_OR_EMPTY_REGEX = /^([a-z0-9]|(?![\s\S]))+$/i;

export const NATIONALITIES_OPTS = arrToOpts(nationalities);
