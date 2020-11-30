import React from 'react'
import { render, cleanup } from 'test-utils'
import { NetworkSelect } from 'components/form/NetworkSelect'
import { useAllNetworks } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
import { generateQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { networks } from '__fixtures__/network'
import { LOADING_TEXT } from '../renderUtils'

jest.mock(
  'app/pages/accounts/pages/withdrawalAddresses/hooks/useAllNetworks'
)

const useAllNetworksMock = useAllNetworks as jest.Mock<
  Partial<ReturnType<typeof useAllNetworks>>
>

describe('NetworkSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    useAllNetworksMock.mockReturnValue(generateQueryResult({ data: networks }))
    render(<NetworkSelect />)
  })

  it('renders loading if loading', () => {
    useAllNetworksMock.mockReturnValue(
      generateQueryResult({ queryStatus: QueryStatus.Loading })
    )
    const { container } = render(<NetworkSelect />)

    expect(container).toHaveTextContent(LOADING_TEXT)
  })
})
