import moment from 'moment';

export const columns = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    render: (val: string) => moment(val).format('MM/DD/YY'),
  },
  {
    key: 'bankName',
    label: 'Bank Name',
  },
  {
    key: 'accountHolderName',
    label: 'Account Holder Name',
  },
  {
    // $FlowFixMe
    key: 'asset.symbol',
    label: 'Currency',
  },
  {
    key: 'bankAccountNumber',
    label: 'Bank Account Number',
  },
  {
    key: '',
    label: 'Actions',
  },
];
