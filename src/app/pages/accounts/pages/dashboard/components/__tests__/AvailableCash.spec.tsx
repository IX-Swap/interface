import React from 'react'
import { render } from 'test-utils'
import {
  AvailableCash,
  getCurrencySymbol,
  noAccountsInfo
} from 'app/pages/accounts/pages/dashboard/components/AvailableCash/AvailableCash'
import { fakeVirtualAccountInfo } from '__fixtures__/portfolio'
import { formatAmount } from 'helpers/numbers'

const fakeArrayOfVirtualAccountInfo = [fakeVirtualAccountInfo]

describe('AvailableCash', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders available cash info correctly', () => {
    const { getAllByTestId } = render(
      <AvailableCash accounts={fakeArrayOfVirtualAccountInfo} />
    )

    getAllByTestId('available-cash-item').forEach((it, i) =>
      expect(it).toHaveTextContent(
        `${getCurrencySymbol(
          fakeArrayOfVirtualAccountInfo[i].currency
        )} ${formatAmount(fakeArrayOfVirtualAccountInfo[i].balance)}`
      )
    )
  })

  it('renders available cash info correctly when accounts is undefined', () => {
    const { getAllByTestId } = render(<AvailableCash accounts={undefined} />)

    getAllByTestId('available-cash-item').forEach((it, i) =>
      expect(it).toHaveTextContent(
        `${getCurrencySymbol(noAccountsInfo[i].currency)} ${formatAmount(
          noAccountsInfo[i].balance
        )}`
      )
    )
  })

  it('renders title with correct text', () => {
    const { getByText } = render(
      <AvailableCash accounts={[fakeVirtualAccountInfo]} />
    )

    expect(getByText('Available Cash')).toBeInTheDocument()
  })
})
