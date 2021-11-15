import { abbreviateNumber } from 'helpers/numbers'
import { formatDateToMMDDYY } from 'helpers/dates'

export const renderCommitment = (commitmentValue: number, commitment: any) => {
  return abbreviateNumber(
    commitmentValue,
    commitment.symbol,
    false,
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      notation: 'compact',
      compactDisplay: 'short'
    })
  )
}

export const columns = [
  {
    label: 'Date',
    key: 'createdAt',
    render: formatDateToMMDDYY
  },
  {
    label: 'Name',
    key: 'user.name'
  },
  {
    label: 'Commitment',
    key: 'totalAmount',
    render: renderCommitment
  },
  {
    label: 'Fund Status',
    key: 'fundStatus'
  },
  {
    label: 'KYC Status',
    key: 'kycStatus'
  }
]
