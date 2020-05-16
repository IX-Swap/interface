// @flow
import actionGenerator from 'context/base/withPagination/actions';
import { postRequest, putRequest } from 'services/httpRequests';
import { userAddBankActions } from './types';

const { getter: getBankAccounts, ...pageMethods } = actionGenerator(
  'bankList',
  '/accounts/banks/list',
  {}
);

// TODO: change any to a definition of a bank post request
async function createBankAccount(
  dispatch: Function,
  payload: { bank: any, userId: string }
) {
  dispatch({ type: userAddBankActions.USER_ADD_BANK_REQUEST });

  try {
    const {
      userId,
      bank: { _id, ...bank },
    } = payload;
    const uri = `/accounts/banks/${userId}${_id ? `/${_id}` : ''}`;
    const method = _id ? putRequest : postRequest;
    const result = await method(uri, { ...bank });
    const response = await result.json();

    if (result.status === 200) {
      dispatch({
        type: userAddBankActions.USER_ADD_BANK_SUCCESS,
        payload: {},
      });
    } else {
      dispatch({
        type: userAddBankActions.USER_ADD_BANK_FAILURE,
        payload: response,
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
  getBankAccounts,
  createBankAccount,
  ...pageMethods,
};
