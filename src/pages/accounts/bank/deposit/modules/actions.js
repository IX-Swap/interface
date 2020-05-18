// @flow
import { postRequest } from 'services/httpRequests';
import storage from 'services/storageHelper';

export const deposit = async (payload: {
  depositCode: string,
  amount: number,
  bank: string,
}) => {
  const url = `/accounts/cash/deposits/${storage.getUserId()}`;
  const response = await postRequest(url, payload);

  return response.status === 200;
};
