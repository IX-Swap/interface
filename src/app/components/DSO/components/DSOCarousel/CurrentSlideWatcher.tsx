import { useContext, useEffect, useState } from 'react'
import { CarouselContext } from 'pure-react-carousel'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const CurrentSlideWatcher = ({
  currentSlide
}: {
  currentSlide: number
}) => {
  const carouselContext = useContext(CarouselContext)
  const { updateFilter } = useQueryFilter()
  const [currentFilterSlide, setCurrentFilterSlide] = useState(currentSlide)

  useEffect(() => {
    updateFilter('currentSlide', carouselContext.state.currentSlide.toString())
  }, [currentFilterSlide]) // eslint-disable-line

  useEffect(() => {
    function onChange() {
      setCurrentFilterSlide(carouselContext.state.currentSlide)
    }
    carouselContext.subscribe(onChange)
    return () => carouselContext.unsubscribe(onChange)
  }, [carouselContext])

  return null
}
