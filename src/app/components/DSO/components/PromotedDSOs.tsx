import React from 'react'
import { Slide } from 'pure-react-carousel'
import { DSOCarousel } from 'app/components/DSO/components/DSOCarousel/DSOCarousel'
import { DSOCard } from 'app/components/DSO/components/DSOCard/DSOCard'
import { usePromotedDSOs } from 'app/pages/invest/hooks/usePromotedDSOs'
import { DSORoute } from 'app/pages/invest/router/config'

export const PromotedDSOs = () => {
  const { data, status } = usePromotedDSOs()

  if (status === 'loading' || data.list.length === undefined) {
    return null
  }

  const promotedDSOs = data.list

  return (
    <DSOCarousel totalSlides={promotedDSOs.length}>
      {promotedDSOs.map((dso, i) => (
        <Slide index={i} key={dso._id} className='custom'>
          <DSOCard dso={dso} viewURL={DSORoute.view} />
        </Slide>
      ))}
    </DSOCarousel>
  )
}
