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

  DELETE_FILE_REQUEST: 'DELETE_FILE_REQUEST',
  DELETE_FILE_SUCCESS: 'DELETE_FILE_SUCCESS',
  DELETE_FILE_FAILURE: 'DELETE_FILE_FAILURE',

  DOWNLOAD_FILE_REQUEST: 'DOWNLOAD_FILE_REQUEST',
  DOWNLOAD_FILE_SUCCESS: 'DOWNLOAD_FILE_SUCCESS',
  DOWNLOAD_FILE_FAILURE: 'DOWNLOAD_FILE_FAILURE',

  GET_CORPORATE_REQUEST: 'GET_CORPORATE_REQUEST',
  GET_CORPORATE_SUCCESS: 'GET_CORPORATE_SUCCESS',
  GET_CORPORATE_FAILURE: 'GET_CORPORATE_FAILURE',

  CREATE_CORPORATE_REQUEST: 'CREATE_CORPORATE_REQUEST',
  CREATE_CORPORATE_SUCCESS: 'CREATE_CORPORATE_SUCCESS',
  CREATE_CORPORATE_FAILURE: 'CREATE_CORPORATE_FAILURE',

  UPDATE_CORPORATE_REQUEST: 'UPDATE_CORPORATE_REQUEST',
  UPDATE_CORPORATE_SUCCESS: 'UPDATE_CORPORATE_SUCCESS',
  UPDATE_CORPORATE_FAILURE: 'UPDATE_CORPORATE_FAILURE',

  TOGGLE_EDIT_MODE: 'TOGGLE_EDIT_MODE',
};

export const STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING',
};

export type IdentityAddress = {
  line1: string,
  line2: string,
  city: string,
  postalCode?: string,
  state: string,
  country: string,
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
  address: IdentityAddress,
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

export type Document = {
  _id: string,
  user: string,
  title: string,
  type: string,
  originalFileName: string,
  checksum: string,
  url: string,
  createdAt: string,
};

export type CorporateFields = {
  companyLegalName: string,
  registrationNumber: string,
  countryOfFormation: string,
  dateOfIncorporation: string,
  companyAddress: string,
  representatives: IdentityProfile,
  directors: IdentityProfile,
  beneficialOwners: IdentityProfile,
};

export type Identity = IdentityProfile &
  $Shape<IndentityFinancials> &
  $Shape<CorporateFields> & {
    _id: string,
    status: 'Rejected' | 'Authorized',
    user: User,
    createdAt: string,
    updatedAt: string,
    documents?: Document[],
    declarations: any[],
    walletAddress: string,
  };

export type DocumentGuide = {
  title: string,
  label: string,
  type: string,
};

export type IdentityState = {
  dataroom: Array<Document | DocumentGuide>,
  corporateDataroom: Array<Document | DocumentGuide>,
  identity: Identity | {},
  corporate: Identity | {},
  status: string,
  shouldCreateNew: boolean,
  editMode: boolean,
  error: {
    save: string | null,
    get: string | null,
  },
  type?: 'individual' | 'corporate',
};

export type DeclarationTemplate = {
  key: string,
  content: string,
  value: 'Yes' | 'No' | null,
  answerable?: boolean,
  lastLine?: boolean,
  sublevel?: boolean,
};
