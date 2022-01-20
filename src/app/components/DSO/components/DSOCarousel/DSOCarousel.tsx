import React, { useState } from 'react'
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext,
  DotGroup
} from 'pure-react-carousel'
import Box from '@material-ui/core/Box'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import classNames from 'classnames'
import useStyles from './DSOCarousel.styles'
import { CurrentSlideWatcher } from 'app/components/DSO/components/DSOCarousel/CurrentSlideWatcher'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
export interface DSOCarouselProps {
  totalSlides: number
}

export const DSOCarousel = (props: any) => {
  const classes = useStyles()
  const { getFilterValue } = useQueryFilter()
  const { isMobile, isTablet } = useAppBreakpoints()
  const [currentSlide] = useState(
    parseInt(getFilterValue('currentSlide') ?? '0')
  )

  const getSlidesCount = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 3
  }

  const slidesCount = getSlidesCount()
  const { children, totalSlides, ...rest } = props

  const nextButton = classNames(classes.navButton, classes.nextButton)
  const backButton = classNames(classes.navButton, classes.backButton)

  return (
    <div {...rest} className={classes.root}>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        visibleSlides={slidesCount}
        totalSlides={totalSlides}
        step={slidesCount}
        isIntrinsicHeight
        currentSlide={currentSlide}
      >
        <Box className={classes.sliderWrapper}>
          <Slider>{children}</Slider>
          <ButtonBack className={backButton}>
            <ChevronLeftIcon fontSize='large' color='inherit' />
          </ButtonBack>

          <ButtonNext className={nextButton}>
            <ChevronRightIcon fontSize='large' color='inherit' />
          </ButtonNext>
        </Box>
        <DotGroup className={classes.dotGroup} />
        <CurrentSlideWatcher currentSlide={currentSlide} />
      </CarouselProvider>
    </div>
  )
}
