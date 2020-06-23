// @flow
import type { Dso } from 'context/dso/types'

export type TableColumns = {
  key: $Keys<Dso>,
  label: string,
  align?: ?string,
  headAlign?: ?string,
  render?: ?(val: any) => string,
};
