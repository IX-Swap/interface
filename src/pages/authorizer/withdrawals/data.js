import moment from 'moment';
import { formatMoney } from 'helpers/formatNumbers';

export const columns = [
  {
    key: 'level',
    label: 'Level',
  },
  {
    key: 'individual.firstName',
    label: 'User',
    render: (val: string, row: any) => `${val} ${row.individual.lastName}`,
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: (val: string) => moment(val).format('MM/DD/YYYY'),
  },
  {
    key: 'bankAccount.bankName',
    label: 'Account Holder Name',
  },
  {
    // $FlowFixMe
    key: 'asset.symbol',
    label: 'Bank name',
  },
  {
    key: 'amount',
    label: 'Amount',
    headAlign: 'right',
    align: 'right',
    render: (val: string, row: any) => formatMoney(val, row.asset.symbol),
  },
  {
    key: '',
    label: 'Actions',
  },
];
