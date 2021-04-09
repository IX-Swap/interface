import { CorporatesPreview } from 'app/pages/identity/components/CorporatesPreview/CorporatesPreview'
import * as useAllCorporates from 'app/pages/identity/hooks/useAllCorporates'
import React from 'react'
import { QueryStatus } from 'react-query'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('CorporatesPreview', () => {
  const useAllCorporatesResponse = generateInfiniteQueryResult({
    list: [corporate, { ...corporate, _id: 2 }]
  })

  beforeEach(() => {
    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => useAllCorporatesResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CorporatesPreview type='investor' />)
  })

  it('renders null when status is loading', () => {
    const useAllCorporatesResponse = generateInfiniteQueryResult({
      list: [corporate, { ...corporate, _id: 2 }],
      queryStatus: QueryStatus.Loading
    })

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => useAllCorporatesResponse as any)

    const { container } = render(<CorporatesPreview type='investor' />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders NoIdentity text when list length is 0', () => {
    const useAllCorporatesResponse = generateInfiniteQueryResult({
      list: []
    })

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => useAllCorporatesResponse as any)

    const { getByText } = render(<CorporatesPreview type='investor' />)
    expect(getByText('You have not created corporate investor identity yet'))
  })
})
