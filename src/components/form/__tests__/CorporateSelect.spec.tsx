import React from 'react'
import { render } from 'test-utils'
import { CorporateSelect } from 'components/form/CorporateSelect'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { LOADING_TEXT } from '../renderUtils'

jest.mock('app/pages/identity/hooks/useAllCorporates')

const useAllCorporateIdentitiesMock = useAllCorporates as jest.Mock<
  Partial<ReturnType<typeof useAllCorporates>>
>

describe('CorporateSelect', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders loading if loading', () => {
    useAllCorporateIdentitiesMock.mockReturnValue(
      generateInfiniteQueryResult({ queryStatus: QueryStatus.Loading })
    )
    const { container } = render(<CorporateSelect />)

    expect(container).toHaveTextContent(LOADING_TEXT)
  })
})
