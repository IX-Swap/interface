import React from 'react'
import { render, cleanup } from 'test-utils'
import { PromoBanner } from '../PromoBanner'

let mockPromoData: { message: string; image: string } | undefined = {
  message: 'social message',
  image: 'path-to-image'
}

let mockIsError = false
let mockIsLoading = false

jest.mock('../../hooks/usePromo', () => ({
  __esModule: true,
  usePromo: jest.fn(() => ({
    promoData: mockPromoData,
    isError: mockIsError,
    isLoading: mockIsLoading
  }))
}))

describe('Promo Banner', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<PromoBanner />)
  })

  it('renders with the fetched data correctly', () => {
    const { getByText, container } = render(<PromoBanner />)
    expect(getByText('social message')).toBeTruthy()
    expect(container.querySelector("img[src='path-to-image']")).toBeTruthy()
  })

  it('renders nothing if data is undefined', () => {
    mockPromoData = undefined
    const { container } = render(<PromoBanner />)
    expect(container.childElementCount).toEqual(0)
  })

  it('renders nothing if fetch receives an error', () => {
    mockIsError = true
    const { container } = render(<PromoBanner />)
    expect(container.childElementCount).toEqual(0)
  })

  it('renders nothing while fetching data', () => {
    mockIsLoading = true
    const { container } = render(<PromoBanner />)
    expect(container.childElementCount).toEqual(0)
  })
})
