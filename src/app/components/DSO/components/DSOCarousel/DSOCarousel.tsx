import React from 'react'
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext,
  DotGroup
} from 'pure-react-carousel'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import classNames from 'classnames'
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
      </CarouselProvider>
    </div>
  )
}
