import { capitalize } from '@material-ui/core'

import { PAYOUT_TYPE } from 'components/TmPayoutEvents/constants'
import { ROLES, ROLES_LABEL } from 'constants/roles'
import { PAYOUT_STATUS } from 'pages/PayoutItem'

export enum FILTERS {
  SEARCH = 'search',
  ROLES = 'roles',
  SEC_TOKENS = 'tokens',
  STATUS = 'status',
  PAYOUT_TYPE = 'type',
  PAYOUT_PERIOD = 'payoutPeriod',
  RECORD_DATE = 'recordDate',
  PAYOUT_TOKEN = 'payoutToken',
  DATE_OF_CLAIM = 'createdAt',
}

export const defaultValues = {
  search: '',
  roles: [],
  tokens: [],
  status: [],
  type: [],
  startDate: null,
  endDate: null,
  recordDate: null,
  payoutToken: [],
  createdAt: null,
} as Record<string, any>

export const rolesOptions = [
  { label: ROLES_LABEL[ROLES.ADMIN], value: ROLES.ADMIN },
  { label: ROLES_LABEL[ROLES.OPERATOR], value: ROLES.OPERATOR },
  { label: ROLES_LABEL[ROLES.TOKEN_MANAGER], value: ROLES.TOKEN_MANAGER },
  { label: ROLES_LABEL[ROLES.USER], value: ROLES.USER },
]

export const statusOptions = [
  { label: capitalize(PAYOUT_STATUS.ANNOUNCED), value: PAYOUT_STATUS.ANNOUNCED },
  { label: capitalize(PAYOUT_STATUS.STARTED), value: PAYOUT_STATUS.STARTED },
  { label: capitalize(PAYOUT_STATUS.SCHEDULED), value: PAYOUT_STATUS.SCHEDULED },
  { label: capitalize(PAYOUT_STATUS.ENDED), value: PAYOUT_STATUS.ENDED },
  { label: capitalize(PAYOUT_STATUS.DELAYED), value: PAYOUT_STATUS.DELAYED },
]

export const payoutTypeOptions = [
  { label: capitalize(PAYOUT_TYPE.ROYALTIES), value: PAYOUT_TYPE.ROYALTIES },
  { label: capitalize(PAYOUT_TYPE.DIVIDENDS), value: PAYOUT_TYPE.DIVIDENDS },
  { label: capitalize(PAYOUT_TYPE.INTEREST), value: PAYOUT_TYPE.INTEREST },
  { label: capitalize(PAYOUT_TYPE.AIRDROPS), value: PAYOUT_TYPE.AIRDROPS },
  { label: capitalize(PAYOUT_TYPE.OTHERS), value: PAYOUT_TYPE.OTHERS },
]
