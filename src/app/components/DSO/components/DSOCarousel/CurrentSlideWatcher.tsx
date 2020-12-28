import { useContext, useEffect } from 'react'
import { CarouselContext } from 'pure-react-carousel'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const CurrentSlideWatcher = () => {
  const carouselContext = useContext(CarouselContext)
  const { updateFilter } = useQueryFilter()

  useEffect(() => {
    function onChange() {
      updateFilter(
        'currentSlide',
        carouselContext.state.currentSlide.toString()
      )
    }
    carouselContext.subscribe(onChange)
    return () => carouselContext.unsubscribe(onChange)
  }, [carouselContext, updateFilter])

  return null
}
