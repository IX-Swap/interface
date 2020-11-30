import React from 'react'
import { render, cleanup } from 'test-utils'
import { BankSelect } from 'components/form/BankSelect'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { bank } from '__fixtures__/authorizer'
import { LOADING_TEXT } from '../renderUtils'

jest.mock('app/pages/accounts/pages/banks/hooks/useBanksData')

const useBanksDataMock = useBanksData as jest.Mock<
  Partial<ReturnType<typeof useBanksData>>
>

describe('BankSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ list: [bank] })
    )
    render(<BankSelect />)
  })

  it('renders loading if loading', () => {
    useBanksDataMock.mockReturnValue(
      generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
    )
    const { container } = render(<BankSelect />)

    expect(container).toHaveTextContent(LOADING_TEXT)
  })
})
