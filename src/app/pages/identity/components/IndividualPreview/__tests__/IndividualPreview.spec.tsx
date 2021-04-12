import { IndividualPreview } from 'app/pages/identity/components/IndividualPreview/IndividualPreview'
import * as useIndividualIdentity from 'hooks/identity/useIndividualIdentity'
import React from 'react'
import { QueryStatus } from 'react-query'
import { render, cleanup } from 'test-utils'
import { individual } from '__fixtures__/identity'
import { generateQueryResult } from '__fixtures__/useQuery'

window.URL.revokeObjectURL = jest.fn()

describe('IndividualPreview', () => {
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
    render(<IndividualPreview />)
  })

  it('renders loading text when isLoading', () => {
    const useIndividualIdentityResponse = generateQueryResult({
      data: individual,
      queryStatus: QueryStatus.Loading
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)
    const { getByText } = render(<IndividualPreview />)
    expect(getByText('Loading...')).toBeTruthy()
  })

  it('render no identity text when identity is undefined', () => {
    const useIndividualIdentityResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useIndividualIdentity, 'useIndividualIdentity')
      .mockImplementation(() => useIndividualIdentityResponse as any)
    const { getByText } = render(<IndividualPreview />)
    expect(
      getByText('You have not created individual identity yet')
    ).toBeTruthy()
  })
})
