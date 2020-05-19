// @flow
import { postRequest } from 'services/httpRequests';
import storage from 'services/storageHelper';

export const withdraw = async (payload: {
  memo: string,
  amount: number,
  bank: string,
}) => {
  const url = `/accounts/cash/withdrawals/${storage.getUserId()}`;
  const response = await postRequest(url, payload);

  return response.status === 200;
};
