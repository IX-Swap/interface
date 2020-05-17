// @flow
import type { User } from 'context/user/types';

export const actions = {
  GET_IDENTITY_REQUEST: 'GET_IDENTITY_REQUEST',
  GET_IDENTITY_SUCCESS: 'GET_IDENTITY_SUCCESS',
  GET_IDENTITY_FAILURE: 'GET_IDENTITY_FAILURE',

  CREATE_IDENTITY_REQUEST: 'CREATE_IDENTITY_REQUEST',
  CREATE_IDENTITY_SUCCESS: 'CREATE_IDENTITY_SUCCESS',
  CREATE_IDENTITY_FAILURE: 'CREATE_IDENTITY_FAILURE',

  SAVE_IDENTITY_REQUEST: 'SAVE_IDENTITY_REQUEST',
  SAVE_IDENTITY_SUCCESS: 'SAVE_IDENTITY_SUCCESS',
  SAVE_IDENTITY_FAILURE: 'SAVE_IDENTITY_FAILURE',

  SAVE_FILE_REQUEST: 'SAVE_FILE_REQUEST',
  SAVE_FILE_SUCCESS: 'SAVE_FILE_SUCCESS',
  SAVE_FILE_FAILURE: 'SAVE_FILE_FAILURE',

  DOWNLOAD_FILE_REQUEST: 'DOWNLOAD_FILE_REQUEST',
  DOWNLOAD_FILE_SUCCESS: 'DOWNLOAD_FILE_SUCCESS',
  DOWNLOAD_FILE_FAILURE: 'DOWNLOAD_FILE_FAILURE',

  BEGIN_RESET_PASSWORD_REQUEST: 'BEGIN_RESET_PASSWORD_REQUEST',
  BEGIN_RESET_PASSWORD_SUCCESS: 'BEGIN_RESET_PASSWORD_SUCCESS',
  BEGIN_RESET_PASSWORD_FAILURE: 'BEGIN_RESET_PASSWORD_FAILURE',

  COMPLETE_RESET_PASSWORD_REQUEST: 'COMPLETE_RESET_PASSWORD_REQUEST',
  COMPLETE_RESET_PASSWORD_SUCCESS: 'COMPLETE_RESET_PASSWORD_SUCCESS',
  COMPLETE_RESET_PASSWORD_FAILURE: 'COMPLETE_RESET_PASSWORD_FAILURE',

  UPDATE_ACCOUNT_TYPE_REQUEST: 'UPDATE_ACCOUNT_TYPE_REQUEST',
  UPDATE_ACCOUNT_TYPE_SUCCESS: 'UPDATE_ACCOUNT_TYPE_SUCCESS',
  UPDATE_ACCOUNT_TYPE_FAILURE: 'UPDATE_ACCOUNT_TYPE_FAILURE',

  GET_CORPORATE_REQUEST: 'GET_CORPORATE_REQUEST',
  GET_CORPORATE_SUCCESS: 'GET_CORPORATE_SUCCESS',
  GET_CORPORATE_FAILURE: 'GET_CORPORATE_FAILURE',

  CREATE_CORPORATE_REQUEST: 'CREATE_CORPORATE_REQUEST',
  CREATE_CORPORATE_SUCCESS: 'CREATE_CORPORATE_SUCCESS',
  CREATE_CORPORATE_FAILURE: 'CREATE_CORPORATE_FAILURE',

  UPDATE_CORPORATE_REQUEST: 'UPDATE_CORPORATE_REQUEST',
  UPDATE_CORPORATE_SUCCESS: 'UPDATE_CORPORATE_SUCCESS',
  UPDATE_CORPORATE_FAILURE: 'UPDATE_CORPORATE_FAILURE',
};

export const STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING',
};

export type IdentityProfile = {
  firstName: string,
  middleName: string,
  lastName: string,
  dob: string,
  gender: 'M' | 'F',
  nationality: string,
  countryOfResidence: string,
  maritalStatus: 'Single' | 'Married',
  contactNumber: string,
  line1: string,
  line2: string,
  city: string,
  postalCode: string,
  state: string,
  country: string,
};

export type IndentityFinancials = {
  annualIncome: string,
  bankAccountName: string,
  bankAccountNumber: string,
  bankName: string,
  employer: string,
  employmentStatus: string,
  houseHoldIncome: string,
  industryOfEmployment: string,
  occupation: string,
  politicallyExposed: boolean,
  sourceOfWealth: string,
};

export type Identity = IdentityProfile &
  $Shape<IndentityFinancials> & {
    _id: string,
    status: 'Rejected' | 'Authorized',
    user: User,
    createdAt: string,
    updatedAt: string,
  };

export type IdentityState = {
  identity: Identity | {},
  status: string,
  shouldCreateNew: boolean,
  editMode: boolean,
  error: {
    save: string | null,
    get: string | null,
  },
};
