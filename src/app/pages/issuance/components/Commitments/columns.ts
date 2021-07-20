import { abbreviateNumber } from 'helpers/numbers'
import { formatDateToMMDDYY } from 'helpers/dates'

// TODO Do refactoring after complete backend api endpoint
export const renderCommitment = (commitmentValue: number, commitment: any) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    // @ts-expect-error
    notation: 'compact',
    compactDisplay: 'short'
  })
  return abbreviateNumber(commitmentValue, commitment.symbol, false, formatter)
}

// TODO Do refactoring after complete backend api endpoint
export const columns = [
  {
    label: 'Date',
    key: 'date',
    render: formatDateToMMDDYY
  },
  {
    label: 'Name',
    key: 'name'
  },
  {
    label: 'Commitment',
    key: 'commitment',
    render: renderCommitment
  },
  {
    label: 'FundStatus',
    key: 'fundStatus'
  },
  {
    label: 'KYC Status',
    key: 'kycStatus'
  }
]
