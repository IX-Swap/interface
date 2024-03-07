import { t } from '@lingui/macro'

export enum FARMING_TABS {
  STAKING = 'STAKING',
  VESTING = 'VESTING',
}

export enum STAKING_TABS {
  ONGOING = 'ONGOING',
  UNSTAKED = 'UNSTAKED',
}

export const STAKING_TABS_STRINGS = {
  [STAKING_TABS.ONGOING]: `My ongoing stakings`,
  [STAKING_TABS.UNSTAKED]: `Rewards vesting`,
}
