import React from 'react';
import { useHistory } from 'react-router-dom';
import TableWithPagination from 'components/TableWithPagination';
import storage from 'services/storageHelper';
import { columns } from './data';

const DepositList = () => {
  const history = useHistory();
  return (
    <TableWithPagination
      id="accountDepositList"
      endpoint={`/accounts/cash/withdrawals/list/${storage.getUserId()}`}
      columns={columns}
      onRowClick={(mWidhrawal) => {
        history.push({
          pathname: '/accounts/banks/withdrawal-view',
          state: { withdrawal: mWidhrawal },
        });
      }}
    />
  );
};

export default DepositList;
