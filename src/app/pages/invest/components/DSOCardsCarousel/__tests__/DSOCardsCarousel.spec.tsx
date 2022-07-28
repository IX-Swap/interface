import React from 'react'
import { render } from 'test-utils'
import { CarouselProvider } from 'pure-react-carousel'
import { DSOCardsCarousel } from 'app/pages/invest/components/DSOCardsCarousel/DSOCardsCarousel'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'

jest.mock('pure-react-carousel', () => ({
  CarouselProvider: jest.fn(() => null)
}))

describe('DSOCardsCarousel', () => {
  const totalSlides = 3
  const basicProps = {
    naturalSlideWidth: 320,
    naturalSlideHeight: 400,
    step: 1,
    isIntrinsicHeight: true
  }
  const children = jest.fn(() => <div />)

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders CarouselProvider correct props ', () => {
    render(
      <DSOCardsCarousel totalSlides={totalSlides}>{children}</DSOCardsCarousel>
    )
    expect(CarouselProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        ...basicProps,
        visibleSlides: 2.4,
        totalSlides
      }),
      {}
    )
  })

  it('renders CarouselProvider with correct props when isMobile is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMobile: true
    } as any)

    render(
      <DSOCardsCarousel totalSlides={totalSlides}>{children}</DSOCardsCarousel>
    )
    expect(CarouselProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        ...basicProps,
        visibleSlides: 1.1,
        totalSlides
      }),
      {}
    )
  })

  it('renders CarouselProvider with correct props when isTablet is true', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: true
    } as any)

    render(
      <DSOCardsCarousel totalSlides={totalSlides}>{children}</DSOCardsCarousel>
    )
    expect(CarouselProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        ...basicProps,
        visibleSlides: 1.6,
        totalSlides
      }),
      {}
    )
  })
})
