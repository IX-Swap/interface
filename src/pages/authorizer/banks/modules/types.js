// @flow
import type { Bank } from 'pages/accounts/bank/modules/types';

export type TableColumn = {
  key: $Keys<Bank>,
  label: string,
  render?: ?(val: any) => string,
};
