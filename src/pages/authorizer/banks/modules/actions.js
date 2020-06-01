// @flow
import type { Bank } from 'pages/accounts/bank/modules/types';
import { putRequest } from 'services/httpRequests';

const toggleBankStatus = async (bank: Bank, newStatus: string) => {
  const action = newStatus.toLowerCase().includes('approve')
    ? 'approve'
    : 'reject';
  const url = `/accounts/banks/${bank._id}/${action}`;
  const response = await putRequest(url);

  return response.status === 200;
};

export default { toggleBankStatus };
