import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { useAllCorporateIdentities } from 'hooks/identity/useAllCorporateIdentities'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { corporate } from '__fixtures__/authorizer'
import { LOADING_TEXT } from '../renderUtils'

jest.mock('hooks/identity/useAllCorporateIdentities')

const useAllCorporateIdentitiesMock = useAllCorporateIdentities as jest.Mock<
  Partial<ReturnType<typeof useAllCorporateIdentities>>
>

describe('CorporateSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    useAllCorporateIdentitiesMock.mockReturnValue(
      generateInfiniteQueryResult({ list: [corporate] })
    )
    render(<CorporateSelect />)
  })

  it('renders loading if loading', () => {
    useAllCorporateIdentitiesMock.mockReturnValue(
      generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
    )
    const { container } = render(<CorporateSelect />)

    expect(container).toHaveTextContent(LOADING_TEXT)
  })
})
