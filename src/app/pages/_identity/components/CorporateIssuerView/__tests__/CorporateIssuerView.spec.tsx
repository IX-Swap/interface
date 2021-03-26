import { CorporateIssuerView } from 'app/pages/_identity/components/CorporateIssuerView/CorporateIssuerView'
import * as useAllCorporates from 'app/pages/_identity/hooks/useAllCorporates'
import * as useIdentitiesRouter from 'app/pages/_identity/router'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateIssuerView', () => {
  beforeEach(() => {
    const useIdentitiesRouterResponse = {
      params: {
        identityId: corporate._id
      }
    }

    jest
      .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
      .mockImplementation(() => useIdentitiesRouterResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const useAllCorporatesResponse = generateInfiniteQueryResult({
      map: {
        [corporate._id]: corporate
      },
      isLoading: false
    })

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => useAllCorporatesResponse as any)

    render(<CorporateIssuerView />)
  })

  it('renders null when isLoading', () => {
    const useAllCorporatesResponse = generateInfiniteQueryResult({
      map: {
        [corporate._id]: corporate
      },
      isLoading: true
    })

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => useAllCorporatesResponse as any)

    const { container } = render(<CorporateIssuerView />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when data is undefined', () => {
    const useAllCorporatesResponse = generateInfiniteQueryResult({
      noData: true,
      isLoading: false
    })

    jest
      .spyOn(useAllCorporates, 'useAllCorporates')
      .mockImplementation(() => useAllCorporatesResponse as any)

    const { container } = render(<CorporateIssuerView />)
    expect(container).toBeEmptyDOMElement()
  })
})
