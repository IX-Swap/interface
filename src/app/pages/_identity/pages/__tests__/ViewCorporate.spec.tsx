import { ViewCorporate } from 'app/pages/_identity/pages/ViewCorporate'
import * as useAllCorporateIdentities from 'hooks/identity/useAllCorporateIdentities'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import * as useIdentitiesRouter from 'app/pages/identity/router'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'

window.URL.revokeObjectURL = jest.fn()

describe('ViewCorporate', () => {
  const identitiesRouter = {
    params: { identityId: '1' }
  }

  beforeEach(() => {
    jest
      .spyOn(useIdentitiesRouter, 'useIdentitiesRouter')
      .mockImplementation(() => identitiesRouter as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const allCorporateIdentities = generateInfiniteQueryResult({
      map: { 1: corporate },
      queryStatus: QueryStatus.Success
    })

    jest
      .spyOn(useAllCorporateIdentities, 'useAllCorporateIdentities')
      .mockImplementation(() => allCorporateIdentities as any)

    render(<ViewCorporate />)
  })

  it('renders null while loading', () => {
    const allCorporateIdentities = generateInfiniteQueryResult({
      map: { 1: corporate },
      queryStatus: QueryStatus.Loading
    })

    jest
      .spyOn(useAllCorporateIdentities, 'useAllCorporateIdentities')
      .mockImplementation(() => allCorporateIdentities as any)

    const { container } = render(<ViewCorporate />)
    expect(container).toBeEmptyDOMElement()
  })
})
