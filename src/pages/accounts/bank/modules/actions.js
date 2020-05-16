// @flow
import actionGenerator from 'context/base/withPagination/actions';
import { postRequest } from 'services/httpRequests';
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
    const uri = `/accounts/banks/${payload.userId}`;
    const result = await postRequest(uri, { ...payload.bank });
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
