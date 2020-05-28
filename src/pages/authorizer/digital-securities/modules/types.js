// @flow
import type { Dso } from 'context/dso/types';

export type TableColumns = {
  key: $Keys<Dso>,
  label: string,
  align?: ?string,
  render?: ?(val: any) => string,
};
