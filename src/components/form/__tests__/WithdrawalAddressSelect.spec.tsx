import React from 'react'
import { render } from 'test-utils'
import { WithdrawalAddressSelect } from 'components/form/WithdrawalAddressSelect'
import { useWithdrawalAddresses } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { LOADING_TEXT } from '../renderUtils'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'

jest.mock(
  'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddresses'
)

const useWithdrawalAddressesMock = useWithdrawalAddresses as jest.Mock<
  Partial<ReturnType<typeof useWithdrawalAddresses>>
>

describe('WithdrawalAddressSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    useWithdrawalAddressesMock.mockReturnValue(
      generateInfiniteQueryResult({ list: [withdrawalAddress] })
    )
    render(<WithdrawalAddressSelect />)
  })

  it('renders loading if loading', () => {
    useWithdrawalAddressesMock.mockReturnValue(
      generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
    )
    const { container } = render(<WithdrawalAddressSelect />)

    expect(container).toHaveTextContent(LOADING_TEXT)
  })
})
