import React from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import Box from '@mui/material/Box'
import useStyles from 'app/pages/invest/components/DSOCardsCarousel/DSOCardsCarousel.styles'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface DSOCardsCarouselProps {
  totalSlides: number
  children: any
}

export const DSOCardsCarousel = (props: DSOCardsCarouselProps) => {
  const classes = useStyles()
  const { isMobile, isTablet } = useAppBreakpoints()
  const { children, totalSlides, ...rest } = props

  const getSlidesCount = () => {
    if (isMobile) return 1.1
    if (isTablet) return 1.6
    return 2.4
  }

  return (
    <div {...rest} className={classes.container}>
      <CarouselProvider
        naturalSlideWidth={320}
        naturalSlideHeight={400}
        visibleSlides={getSlidesCount()}
        totalSlides={totalSlides}
        step={1}
        isIntrinsicHeight
      >
        <Box className={classes.wrapper}>
          <Slider>{children}</Slider>
        </Box>
      </CarouselProvider>
    </div>
  )
}
