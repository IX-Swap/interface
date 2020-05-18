// @flow
import moment from 'moment';
import { getRequest, putRequest } from 'services/httpRequests';
import localStore from 'services/storageHelper';
import { actions } from './types';
import type { Identity, IdentityProfile, IndentityFinancials } from './types';

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

export async function saveIdentity(
  dispatch: Function,
  identity: $Shape<IdentityProfile>
) {
  const userId = localStore.getUserId();

  dispatch({ type: actions.SAVE_IDENTITY_REQUEST });

  try {
    const uri = `/identity/individuals/${userId}`;
    const result = await putRequest(uri, { ...identity });

    const response = await result.json();

    console.log(response);
    if (result.status === 200) {
      const payload = response.data || {};
      dispatch({ type: actions.SAVE_IDENTITY_SUCCESS, payload });
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Saving profile failed.';
    dispatch({ type: actions.SAVE_IDENTITY_FAILURE, payload: errMsg });
    throw new Error(errMsg);
  }
}

export async function saveFinancials(
  dispatch: Function,
  financials: IndentityFinancials
) {
  const userId = localStore.getUserId();
  dispatch({ type: actions.SAVE_IDENTITY_REQUEST });

  try {
    const uri = `/identity/individuals/${userId}/financials`;
    const result = await putRequest(uri, financials);
    const response = await result.json();
    if (result.status === 200) {
      const payload = response.data || {};
      dispatch({
        type: actions.SAVE_IDENTITY_SUCCESS,
        payload,
      });
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Saving profile failed.';
    dispatch({ type: actions.SAVE_IDENTITY_FAILURE, payload: errMsg });
    throw new Error(errMsg);
  }
}

// export async function saveFile(dispatch, payload) {
//   /**
//    * saveFile requires the following params in payload
//    * @param String title
//    * @param String type
//    * @param String file
//    * @param Enum type individual | corporate
//    * @param String id individal document id or corporate document id
//    */

//   const { title, file, type, id } = payload;
//   dispatch({ type: actions.SAVE_FILE_REQUEST });

//   try {
//     const formData = new FormData();

//     formData.append('title', title);
//     formData.append('document', file);
//     formData.append('type', type);

//     const uri = '/dataroom';
//     const result = await postRequest(uri, formData);

//     const response = await result.json();
//     if (result.status === 200) {
//       const data = response.data[0];
//       const payload = {
//         ...data,
//         fileName: data.fileName || data.originalFileName,
//       };

//       // as the API implements a two step process to upload
//       // a file, we have to also associate the file with
//       // the individual or corporate

//       dispatch({ type: actions.SAVE_FILE_SUCCESS, payload });

//       await saveIdentity(dispatch, { type, id, documents: [data._id] }, false);
//     } else {
//       throw new Error(response.message);
//     }
//   } catch (err) {
//     const errMsg = err.message || err.toString() || 'Upload failed.';
//     dispatch({ type: actions.SAVE_FILE_FAILURE, payload: errMsg });
//     throw new Error(errMsg);
//   }
// }

// export const downloadFile = async (dispatch, documentId) => {
//   try {
//     dispatch({ type: actions.DOWNLOAD_FILE_REQUEST });
//     const uri = `/dataroom/raw/${documentId}`;
//     const result = await getRequest(uri);

//     if (result.status === 200) {
//       result.blob().then((blob) => {
//         const url = window.URL.createObjectURL(blob);
//         window.open(url);
//         dispatch({ type: actions.DOWNLOAD_FILE_SUCCESS });
//       });
//     } else {
//       dispatch({ type: actions.DOWNLOAD_FILE_FAILURE });
//     }
//   } catch (err) {
//     console.log(err);
//     dispatch({ type: actions.DOWNLOAD_FILE_FAILURE });
//   }
// };

// // selectors
// export const selectFile = (state, title) =>
//   state.identity.documents
//     ?.filter?.((f) => f.title === title)
//     .reduce((lastFile, currFile) => {
//       if (!lastFile) return currFile;
//       const lastDate = new Date(lastFile.createdAt);
//       const currDate = new Date(currFile.createdAt);
//       const isLastFileOutdated = compareAsc(currDate, lastDate) === 1;
//       return isLastFileOutdated ? currFile : lastFile;
//     }, null);

// export const beginResetPassword = async (dispatch, email) => {
//   dispatch({ type: actions.BEGIN_RESET_PASSWORD_REQUEST });
//   try {
//     const uri = `/auth/password/reset/start`;
//     const result = await postRequest(uri, { email });
//     const response = await result.json();
//     if (result.status === 200) {
//       dispatch({
//         type: actions.BEGIN_RESET_PASSWORD_SUCCESS,
//         payload: response.message,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     dispatch({ type: actions.BEGIN_RESET_PASSWORD_FAILURE });
//   }
// };

// export const completeResetPassword = async (
//   dispatch,
//   email,
//   resetToken,
//   newPassword
// ) => {
//   dispatch({ type: actions.COMPLETE_RESET_PASSWORD_REQUEST });
//   try {
//     const uri = `/auth/password/reset/confirm`;
//     const payload = {
//       email,
//       resetToken,
//       newPassword,
//     };
//     const result = await postRequest(uri, payload);
//     const response = await result.json();
//     if (result.status === 200) {
//       dispatch({
//         type: actions.COMPLETE_RESET_PASSWORD_SUCCESS,
//         payload: response.message,
//       });
//     } else {
//       dispatch({
//         type: actions.COMPELTE_RESET_PASSWORD_FAILURE,
//         payload: response.message,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     dispatch({ type: actions.COMPLETE_RESET_PASSWORD_FAILURE });
//   }
// };

// export const getCorporate = async (dispatch) => {
//   try {
//     const uri = '/identity/profile/corporate';
//     const result = await getRequest(uri);
//     const response = result.json();
//     if (result.status === 200) {
//       dispatch({
//         type: actions.GET_CORPORATE_REQUEST,
//         payload: response.data,
//       });
//     } else {
//       dispatch({
//         type: actions.GET_IDENTITY_FAILURE,
//         payload: 'Failed to get Corporate Profile.',
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     dispatch({
//       type: actions.GET_CORPORATE_REQUEST,
//       payload: 'Fatal error getting corporate profile.',
//     });
//   }
// };
