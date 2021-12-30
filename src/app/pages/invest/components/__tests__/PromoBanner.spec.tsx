import React from 'react'
import { render } from 'test-utils'
import { mockPromoData } from '__fixtures__/promo'
import { PromoBanner } from '../PromoBanner'
import * as usePromo from '../../hooks/usePromo'
import { generateQueryResult } from '__fixtures__/useQuery'

describe('Promo Banner', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    jest
      .spyOn(usePromo, 'usePromo')
      .mockReturnValue(generateQueryResult({ data: mockPromoData }))
    render(<PromoBanner />)
  })

  it.skip('renders with the fetched data correctly', () => {
    jest
      .spyOn(usePromo, 'usePromo')
      .mockReturnValue(generateQueryResult({ data: mockPromoData }))

    const { getByText, getByTestId } = render(<PromoBanner />)
    expect(getByText('Stay Home, Stay Safe')).toBeTruthy()
    expect(getByTestId('promo-image')).not.toBeNull()
  })

  it('renders nothing if data is undefined', () => {
    jest
      .spyOn(usePromo, 'usePromo')
      .mockReturnValue(generateQueryResult({ data: undefined }))

    const { container } = render(<PromoBanner />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if fetch receives an error', () => {
    jest
      .spyOn(usePromo, 'usePromo')
      .mockReturnValue(
        generateQueryResult({ data: mockPromoData, error: 'error' })
      )

    const { container } = render(<PromoBanner />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing while fetching data', () => {
    jest
      .spyOn(usePromo, 'usePromo')
      .mockReturnValue(
        generateQueryResult({ data: mockPromoData, isLoading: true })
      )

    const { container } = render(<PromoBanner />)
    expect(container).toBeEmptyDOMElement()
  })
})
