import React, { useEffect } from 'react'
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext,
  DotGroup
} from 'pure-react-carousel'
import { useTheme } from '@material-ui/core/styles'
import { DSOCarouselNavButton } from 'app/components/DSO/components/DSOCarousel/NavButton'
import ChevronLeft from 'assets/icons/carousel/chevron-left.svg'
import ChevronRight from 'assets/icons/carousel/chevron-right.svg'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useStyles from './DSOCarousel.styles'
import 'pure-react-carousel/dist/react-carousel.es.css'

export interface DSOCarouselProps {
  totalSlides: number
}

export const DSOCarousel = (props: any) => {
  const classes = useStyles()
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const slidesCount = isMobile ? 1 : 2

  useEffect(() => {
    window.resizeBy(0, 0)
  }, [])

  const { children, totalSlides, ...rest } = props

  return (
    <div className={classes.root} {...rest}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        visibleSlides={slidesCount}
        totalSlides={totalSlides}
        step={slidesCount}
        isIntrinsicHeight
      >
        <Slider style={{ marginBottom: 65 }}>{children}</Slider>
        <DSOCarouselNavButton position='left'>
          <ButtonBack>
            <img src={ChevronLeft} alt='Previous Page' />
          </ButtonBack>
        </DSOCarouselNavButton>
        <DSOCarouselNavButton position='right'>
          <ButtonNext>
            <img src={ChevronRight} alt='Next Page' />
          </ButtonNext>
        </DSOCarouselNavButton>
        <DotGroup />
      </CarouselProvider>
    </div>
  )
}
