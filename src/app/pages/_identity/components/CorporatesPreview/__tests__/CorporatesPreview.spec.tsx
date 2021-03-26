import { CorporatesPreview } from 'app/pages/_identity/components/CorporatesPreview/CorporatesPreview'
import * as useAllCorporates from 'app/pages/_identity/hooks/useAllCorporates'
import * as useIdentitiesRouter from 'app/pages/_identity/router'
import React from 'react'
import { QueryStatus } from 'react-query'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('CorporatesPreview', () => {
  const viewIssuerPath = '/view/issuer'
  const editIssuerPath = '/edit/issuer'
  const viewCorporatePath = '/view/corporate'
  const editCorporatePath = '/edit/corporate'

  const useIdentitiesRouterResponse = {
    paths: {
      corporate: viewCorporatePath,
      editCorporate: editCorporatePath,
      viewIssuer: viewIssuerPath,
      editIssuer: editIssuerPath
    }
  }

  const useAllCorporatesResponse = generateInfiniteQueryResult({
    list: [corporate, { ...corporate, _id: 2 }]
  })

  beforeEach(() => {
    jest
      .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
      .mockImplementation(() => useIdentitiesRouterResponse as any)

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
