// @flow
import moment from 'moment';
import { forEach } from 'lodash';
import {
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
} from 'services/httpRequests';
import localStore from 'services/storageHelper';
import { snackbarService } from 'uno-material-ui';
import { actions } from './types';
import type { Identity } from './types';
import declarationTemplate from '../data/declarations';

const formatDeclarations = (
  payloadItems: Array<any>,
  type: 'individual' | 'corporate'
) => {
  const declarations = [];
  const payload = {};
  forEach(payloadItems, (item) => {
    const key = Object.keys(item)[0];
    payload[key] = item[key];
  });

  forEach(declarationTemplate[type], (d) => {
    // get item key
    const { key } = d;
    if (payload[key]) {
      // add merged object
      declarations.push({
        ...d,
        value: payload[key],
      });
    } else {
      declarations.push(d);
    }
  });

  return declarations;
};

const fetchCorporateIdentity = async () => {
  const userId = localStore.getUserId();
  const corporateUri = `/identity/corporates/${userId}/list`;
  const result = await postRequest(corporateUri, { skip: 0, limit: 50 });
  const response = await result.json();

  if (result.status === 200) {
    if (response.data.length) {
      return response.data[0].documents[0];
    }

    return null;
  }

  throw new Error(response.message);
};

const fetchIndividualIdentity = async () => {
  const userId = localStore.getUserId();
  const individualUri = `/identity/individuals/${userId}`;
  const result = await getRequest(individualUri);
  const response = await result.json();

  if (result.status === 200) {
    return response.data;
  }

  throw new Error(response.message);
};

export const getIdentity = async (
  dispatch: Function,
  indcludeCorporate: boolean = false
) => {
  dispatch({ type: actions.GET_IDENTITY_REQUEST });

  let dispatchPayload = {
    identity: {},
    corporate: {},
    shouldCreateNew: true,
    editMode: true,
  };

  try {
    const requests = [fetchIndividualIdentity()];
    if (indcludeCorporate) {
      requests.push(fetchCorporateIdentity());
    }

    const [
      individualIdentity = null,
      corporateIdentity = null,
    ] = await Promise.all(requests);

    // insert individual identity
    if (individualIdentity !== null) {
      const declarations = formatDeclarations(
        individualIdentity.declarations,
        'individual'
      );

      dispatchPayload = {
        ...dispatchPayload,
        identity: { ...individualIdentity, declarations },
        shouldCreateNew: false,
        editMode: false,
      };
    }

    // insert corporate identity
    if (corporateIdentity !== null) {
      const declarations = formatDeclarations(
        corporateIdentity.declarations,
        'corporate'
      );

      dispatchPayload = {
        ...dispatchPayload,
        corporate: { ...corporateIdentity, declarations },
        shouldCreateNew: false,
        editMode: false,
      };
    }

    dispatch({
      type: actions.GET_IDENTITY_SUCCESS,
      payload: dispatchPayload,
    });
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Loading profile failed.';
    dispatch({ type: actions.GET_IDENTITY_FAILURE, payload: errMsg });
    throw new Error(errMsg);
  }
};

const createIndividualIdentity = async ({
  initialPayload,
  financialPayload,
}) => {
  const userId = localStore.getUserId();

  const profileUri = `/identity/individuals/${userId}`;
  const profileResult = await putRequest(profileUri, {
    ...initialPayload,
    ...financialPayload,
  });

  if (profileResult) {
    if (profileResult.status === 200) {
      const response = await profileResult.json();
      const payload = response.data;
      const mDeclarations = formatDeclarations(
        payload.declarations,
        'individual'
      );
      return { ...payload, declarations: mDeclarations };
    }

    const x = await profileResult.json();
    throw new Error(x.message);
  }

  throw new Error('Creating profile failed.');
};

const createCorporateIdentity = async (corporatePayload: any, id?: string) => {
  const userId = localStore.getUserId();
  let result;

  if (id) {
    const uri = `/identity/corporates/${userId}/${id}`;
    result = await putRequest(uri, corporatePayload);
  } else {
    const uri = `/identity/corporates/${userId}`;
    result = await postRequest(uri, corporatePayload);
  }

  if (result) {
    if (result.status === 200) {
      const response = await result.json();

      const payload = response.data;
      const mDeclarations = formatDeclarations(
        payload.declarations,
        'corporate'
      );
      console.log(mDeclarations);
      return { ...payload, declarations: mDeclarations };
    }

    const x = await result.json();
    throw new Error(x.message);
  }

  throw new Error('Creating profile failed.');
};

export const createIdentity = async (
  dispatch: Function,
  identity: $Shape<Identity>,
  type: 'corporate' | 'individual',
  id?: string
) => {
  dispatch({ type: actions.CREATE_IDENTITY_REQUEST });

  const {
    firstName,
    middleName,
    lastName,
    dob,
    toArrangeCustody,
    gender,
    nationality,
    countryOfResidence,
    maritalStatus,
    contactNumber,
    address,
    declarations,
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
    walletAddress,
    // Corporate Fields
    companyLegalName,
    registrationNumber,
    countryOfFormation,
    dateOfIncorporation,
    companyAddress,
    representatives,
    directors,
    beneficialOwners,
  } = identity;

  const documents = identity.documents?.map((document) => document._id);

  if (type === 'individual') {
    const initialPayload = {
      firstName,
      middleName,
      lastName,
      gender,
      nationality,
      countryOfResidence,
      maritalStatus,
      contactNumber,
      documents,
      address,
      dob: moment(dob).format('YYYY-MM-DDTmm:hh:ss'),
      declarations,
      walletAddress,
    };

    const financialPayload = {
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
      toArrangeCustody,
    };

    try {
      const createdIdentity = await createIndividualIdentity({
        initialPayload,
        financialPayload,
      });

      if (createdIdentity) {
        dispatch({
          type: actions.CREATE_IDENTITY_SUCCESS,
          payload: {
            identity: createdIdentity,
            type: 'individual',
          },
        });
      }
    } catch (err) {
      const errMsg = err.message || err.toString() || 'Saving profile failed.';
      dispatch({ type: actions.CREATE_IDENTITY_FAILURE, payload: errMsg });
      snackbarService.showSnackbar(err.toString(), 'error');
    }
  } else if (type === 'corporate') {
    try {
      const createdIdentity = await createCorporateIdentity(
        {
          companyLegalName,
          toArrangeCustody,
          registrationNumber,
          countryOfFormation,
          dateOfIncorporation,
          companyAddress,
          representatives,
          directors,
          beneficialOwners,
          documents,
          declarations,
          walletAddress,
        },
        id
      );

      if (createdIdentity) {
        dispatch({
          type: actions.CREATE_IDENTITY_SUCCESS,
          payload: {
            corporate: createdIdentity,
            type: 'corporate',
          },
        });
      }
    } catch (err) {
      const errMsg = err.message || err.toString() || 'Saving profile failed.';
      dispatch({ type: actions.CREATE_IDENTITY_FAILURE, payload: errMsg });
      snackbarService.showSnackbar(err.toString(), 'error');
    }
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

      dispatch({ type: actions.SAVE_FILE_SUCCESS, payload: { data, type } });
    } else {
      dispatch({ type: actions.SAVE_FILE_FAILURE, payload: response.message });
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Upload failed.';
    dispatch({ type: actions.SAVE_FILE_FAILURE, payload: errMsg });
    console.log(err);
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

export const toggleEditMode = (dispatch: Function, payload: boolean) => {
  dispatch({ type: actions.TOGGLE_EDIT_MODE, payload });
};
