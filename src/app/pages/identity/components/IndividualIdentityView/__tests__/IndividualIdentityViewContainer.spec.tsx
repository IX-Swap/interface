import { IndividualIdentityViewContainer } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityViewContainer'
import * as useIndividualIdentity from 'hooks/identity/useIndividualIdentity'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'
import { generateQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('IndividualIdentityView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const useIndividualIdentityResponse = generateQueryResult({
      data: individual,
      isLoading: false
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)
    render(<IndividualIdentityViewContainer />)
  })

  it('renders null when isLoading', () => {
    const useIndividualIdentityResponse = generateQueryResult({
      data: individual,
      isLoading: true
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)
    const { container } = render(<IndividualIdentityViewContainer />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when data is undefined', () => {
    const useIndividualIdentityResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)
    const { container } = render(<IndividualIdentityViewContainer />)

    expect(container).toBeEmptyDOMElement()
  })
})
