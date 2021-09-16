import { t } from '@lingui/macro'

export enum FARMING_TABS {
  STAKING = 'STAKING',
  VESTING = 'VESTING',
}

export const FARMING_STRINGS = {
  [FARMING_TABS.STAKING]: t`Staking IXS`,
  [FARMING_TABS.VESTING]: t`Vesting IXS`,
}

export enum STAKING_TABS {
  ONGOING = 'ONGOING',
  UNSTAKED = 'UNSTAKED',
}

export const STAKING_TABS_STRINGS = {
  [STAKING_TABS.ONGOING]: t`My ongoing stakings`,
  [STAKING_TABS.UNSTAKED]: t`Rewards vesting`,
}
