import { DetailsOfIssuanceView } from 'app/pages/identity/components/DetailsOfIssuanceView/DetailsOfIssuanceView'
import * as useDetailsOfIssuance from 'app/pages/identity/hooks/useDetailsOfIssuance'
import React from 'react'
import { render } from 'test-utils'
import { detailsOfIssuance } from '__fixtures__/identity'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('DetailsOfIssuanceView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders null when isLoading', () => {
    const objResponse = generateQueryResult({
      data: detailsOfIssuance,
      isLoading: true
    })

    jest
      .spyOn(useDetailsOfIssuance, 'useDetailsOfIssuance')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<DetailsOfIssuanceView />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders null when data is undefined', () => {
    const objResponse = generateQueryResult({
      data: undefined,
      isLoading: false
    })

    jest
      .spyOn(useDetailsOfIssuance, 'useDetailsOfIssuance')
      .mockImplementation(() => objResponse as any)

    const { container } = render(<DetailsOfIssuanceView />)
    expect(container).toBeEmptyDOMElement()
  })
})
