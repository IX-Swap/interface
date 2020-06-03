// @flow
import { formatNumber } from 'helpers/formatNumbers';

export const columns = [
  {
    key: 'symbol',
    label: 'Asset',
    render: (val: string, row: any) => `${row.name} (${val})`,
  },
  {
    key: 'balance',
    label: 'Balance',
    align: 'right',
    render: (val: number) => formatNumber(val),
  },
  {
    key: 'onHold',
    label: 'On Hold',
    align: 'right',
    render: (val: number) => formatNumber(val),
  },
  {
    key: 'available',
    label: 'Available',
    align: 'right',
    render: (val: number) => formatNumber(val),
  },
];
