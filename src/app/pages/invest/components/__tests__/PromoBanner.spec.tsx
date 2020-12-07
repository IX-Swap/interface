import React from 'react'
import { render, cleanup } from 'test-utils'
import { mockPromoData } from '__fixtures__/promo'
import { PromoBanner } from '../PromoBanner'
import * as usePromo from '../../hooks/usePromo'

describe('Promo Banner', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest.spyOn(usePromo, 'usePromo').mockReturnValue(mockPromoData)

    render(<PromoBanner />)
  })

  it('renders with the fetched data correctly', () => {
    jest.spyOn(usePromo, 'usePromo').mockReturnValue(mockPromoData)

    const { getByText, getByTestId } = render(<PromoBanner />)
    expect(getByText('Stay Home, Stay Safe')).toBeTruthy()
    expect(getByTestId('promo-image')).not.toBeNull()
  })

  it('renders nothing if data is undefined', () => {
    jest
      .spyOn(usePromo, 'usePromo')
      .mockReturnValue({ ...mockPromoData, promoData: undefined })

    const { container } = render(<PromoBanner />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if fetch receives an error', () => {
    jest
      .spyOn(usePromo, 'usePromo')
      .mockReturnValue({ ...mockPromoData, isError: true })

    const { container } = render(<PromoBanner />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing while fetching data', () => {
    jest
      .spyOn(usePromo, 'usePromo')
      .mockReturnValue({ ...mockPromoData, isLoading: true })

    const { container } = render(<PromoBanner />)
    expect(container).toBeEmptyDOMElement()
  })
})
