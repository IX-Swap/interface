import React from 'react'
import { render, cleanup } from 'test-utils'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { corporate } from '__fixtures__/authorizer'
import { LOADING_TEXT } from '../renderUtils'

jest.mock('app/pages/_identity/hooks/useAllCorporates')

const useAllCorporateIdentitiesMock = useAllCorporates as jest.Mock<
  Partial<ReturnType<typeof useAllCorporates>>
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
