// @flow
import moment from 'moment';
import {
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
} from 'services/httpRequests';
import localStore from 'services/storageHelper';
import { actions } from './types';
import type { Identity } from './types';

export const getIdentity = async (dispatch: Function) => {
  const userId = localStore.getUserId();

  dispatch({ type: actions.GET_IDENTITY_REQUEST });

  try {
    const individualUri = `/identity/individuals/${userId}`;

    const result = await getRequest(individualUri);
    const response = await result.json();

    if (result.status === 200) {
      const payload =
        response.data === null
          ? {
              identity: {},
              shouldCreateNew: true,
              editMode: true,
            }
          : {
              identity: response.data,
              shouldCreateNew: false,
              editMode: false,
            };

      dispatch({
        type: actions.GET_IDENTITY_SUCCESS,
        payload,
      });
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Loading profile failed.';
    dispatch({ type: actions.GET_IDENTITY_FAILURE, payload: errMsg });
    throw new Error(errMsg);
  }
};

export const createIdentity = async (
  dispatch: Function,
  identity: $Shape<Identity>
) => {
  const userId = localStore.getUserId();
  dispatch({ type: actions.CREATE_IDENTITY_REQUEST });

  const {
    firstName,
    middleName,
    lastName,
    // dob,
    // gender,
    nationality,
    countryOfResidence,
    maritalStatus,
    contactNumber,
    line1,
    line2,
    city,
    postalCode,
    state,
    country,
    occupation,
    employmentStatus,
    employer,
    industryOfEmployment,
    bankName,
    bankAccountName,
    bankAccountNumber,
    annualIncome,
    houseHoldIncome,
    sourceOfWealth,
    politicallyExposed,
  } = identity;

  const documents = identity.documents?.map((document) => document._id);

  const address = {
    line1,
    line2,
    city,
    postalCode,
    state,
    country,
  };

  try {
    const profileUri = `/identity/individuals/${userId}`;
    const profileResult = await putRequest(profileUri, {
      firstName,
      middleName,
      lastName,
      gender: 'M', // TEMP overwrite to prevent error
      nationality,
      countryOfResidence,
      maritalStatus,
      contactNumber,
      documents,
      address,
      dob: moment().format('YYYY-MM-DDTHH:mm:ss'), // TEMP overwrite to prevent error
    });

    const financialsUri = `/identity/individuals/${userId}/financials`;
    const financialsResult = await putRequest(financialsUri, {
      occupation,
      employmentStatus,
      employer,
      industryOfEmployment,
      bankName,
      bankAccountName,
      bankAccountNumber,
      annualIncome,
      houseHoldIncome,
      sourceOfWealth,
      politicallyExposed,
    });

    if (profileResult && financialsResult) {
      const response = await financialsResult.json();
      dispatch({
        type: actions.CREATE_IDENTITY_SUCCESS,
        payload: response.data,
      });
    } else {
      throw new Error('Creating profile failed.');
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Saving profile failed.';
    dispatch({ type: actions.CREATE_IDENTITY_FAILURE, payload: errMsg });
    throw new Error(errMsg);
  }
};

export async function uploadFile(
  dispatch: Function,
  payload: { title: string, type: string, file: any }
) {
  /**
   * saveFile requires the following params in payload
   * @param String title
   * @param String type
   * @param String file
   * @param Enum type Identity/Individual | Identity/Corporate
   * @param String id individal document id or corporate document id
   */

  const { title, file, type } = payload;
  dispatch({ type: actions.SAVE_FILE_REQUEST });

  try {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('documents', file);
    formData.append('type', type);

    const uri = '/dataroom';
    const result = await postRequest(uri, formData);

    const response = await result.json();
    if (result.status === 200) {
      const data = response.data[0];

      dispatch({ type: actions.SAVE_FILE_SUCCESS, payload: data });
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Upload failed.';
    dispatch({ type: actions.SAVE_FILE_FAILURE, payload: errMsg });
    throw new Error(errMsg);
  }
}

export const downloadFile = async (dispatch: Function, documentId: string) => {
  const userId = localStore.getUserId();
  try {
    dispatch({ type: actions.DOWNLOAD_FILE_REQUEST });
    const uri = `/dataroom/raw/${userId}/${documentId}`;
    const result = await getRequest(uri);

    if (result.status === 200) {
      result.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        dispatch({ type: actions.DOWNLOAD_FILE_SUCCESS });
      });
    } else {
      dispatch({ type: actions.DOWNLOAD_FILE_FAILURE });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: actions.DOWNLOAD_FILE_FAILURE });
  }
};

export const deleteFile = async (dispatch: Function, documentId: string) => {
  const userId = localStore.getUserId();
  try {
    dispatch({ type: actions.DELETE_FILE_REQUEST });
    const uri = `/dataroom/${userId}/${documentId}`;
    const result = await deleteRequest(uri);

    if (result.status === 200) {
      const response = await result.json();
      dispatch({
        type: actions.DELETE_FILE_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({ type: actions.DELETE_FILE_FAILURE });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: actions.DELETE_FILE_FAILURE });
  }
};
