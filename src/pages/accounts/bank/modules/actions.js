// @flow
import localStore from 'services/storageHelper';
import actionGenerator from 'context/base/withPagination/actions';
import { postRequest, putRequest, getRequest } from 'services/httpRequests';
import { userAddBankActions } from './types';
import type { BankRequest } from './types';

const { getter: getBankAccounts, ...pageMethods } = actionGenerator(
  'bankList',
  `/accounts/banks/list/${localStore.getUserId()}`,
  {}
);

async function getBank(dispatch: Function, payload: { bankId: string }) {
  try {
    const { bankId } = payload;
    const userId = localStore.getUserId();
    const uri = `/accounts/banks/${userId}/${bankId}`;
    const result = await getRequest(uri);
    const response = await result.json();

    if (result.status === 200) {
      return response.data;
    }

    throw new Error(response.message);
  } catch (err) {
    throw new Error(err);
  }
}

async function createBankAccount(
  dispatch: Function,
  payload: { bank: BankRequest }
) {
  dispatch({ type: userAddBankActions.USER_ADD_BANK_REQUEST });
  const userId = localStore.getUserId();
  const updateParams = {};

  try {
    const {
      bank: { _id, ...bank },
    } = payload;

    // prepare handler for status reset
    /* if (_id) {
      updateParams.status = 'Unauthorized';
    } */

    const uri = `/accounts/banks/${userId}${_id ? `/${_id}` : ''}`;
    const method = _id ? putRequest : postRequest;
    const result = await method(uri, { ...bank, ...updateParams });
    const response = await result.json();

    if (result.status === 200) {
      dispatch({
        type: userAddBankActions.USER_ADD_BANK_SUCCESS,
        payload: {},
      });
    } else {
      dispatch({
        type: userAddBankActions.USER_ADD_BANK_FAILURE,
        payload: {
          ...response,
          statusCode: result.status,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: userAddBankActions.USER_ADD_BANK_FAILURE,
      payload: { message: 'Failed to add this bank account.' },
    });
  }
}

export default {
  getBank,
  getBankAccounts,
  createBankAccount,
  ...pageMethods,
};
