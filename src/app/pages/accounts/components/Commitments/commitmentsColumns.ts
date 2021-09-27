import {
  renderDSONameAndStructure,
  renderExpectedReturn,
  renderTotalFundraisingAmount
} from 'app/pages/invest/components/DSOTable/columns'
import { formatDateToMMDDYY } from 'helpers/dates'
import { formatMoney } from 'helpers/numbers'
import { Commitment } from 'types/commitment'
import { TableColumn } from 'types/util'

export const renderCommitmentDSOLogo = (_: any, row: Commitment) =>
  renderDSONameAndStructure(row.dso.tokenName, row.dso, 50)

export const renderCommitmentDSOFundRaisingAmount = (_: any, row: Commitment) =>
  renderTotalFundraisingAmount(row.dso.totalFundraisingAmount ?? 0, row.dso)

export const renderCommitmentDSOExpectedReturn = (_: any, row: Commitment) =>
  renderExpectedReturn(row.dso.interestRate ?? 0, row.dso)

export const renderCommitted = (value: any, row: Commitment) =>
  formatMoney(value, row.dso.currency.symbol, true)

export const commitmentsColumns: Array<TableColumn<Commitment>> = [
  {
    key: 'dso',
    label: 'Offer Name',
    render: renderCommitmentDSOLogo,
    headAlign: 'left',
    align: 'left'
  },
  {
    label: 'Closing Date',
    key: 'dso.completionDate',
    render: formatDateToMMDDYY
  },
  {
    label: 'Raising',
    key: 'dso.totalFundraisingAmount',
    render: renderCommitmentDSOFundRaisingAmount
  },
  {
    label: 'Committed',
    key: 'totalAmount',
    render: renderCommitted
  },
  {
    key: 'dso.distributionFrequency',
    label: 'Distribution Frequency'
  },
  {
    key: 'dso.interestRate',
    label: 'Expected Return',
    render: renderCommitmentDSOExpectedReturn
  }
]
