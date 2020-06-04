import moment from 'moment';

export const columns = [
  {
    key: 'level',
    label: 'Level',
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: (val: string) => moment(val).format('MM/DD/YY'),
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'bankAccount.bankName',
    label: 'Bank Name',
  },
  {
    key: 'bankAccount.bankAccountNumber',
    label: 'Bank Account Number',
  },
  {
    key: 'amount',
    align: 'right',
    label: 'Amount',
    render: (val: string, row: any) => `${row.asset.symbol} ${val}`,
  },
];
