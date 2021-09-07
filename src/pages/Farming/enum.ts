import { t } from '@lingui/macro'

export enum FARMING_TABS {
  STAKING = 'STAKING',
  VESTING = 'VESTING',
}

export const FARMING_STRINGS = {
  [FARMING_TABS.STAKING]: t`Staking IXS`,
  [FARMING_TABS.VESTING]: t`Vesting IXS`,
}
