import React from 'react'
import { Slide } from 'pure-react-carousel'
import { DSOCarousel } from 'app/components/DSO/components/DSOCarousel/DSOCarousel'
import { DSOOfferCard } from 'app/components/DSO/components/DSOOfferCard/DSOOfferCard'
import { useTopDSOs } from 'app/pages/invest/hooks/useTopDSOs'
import { OfferingRoute } from 'app/pages/invest/routers/offeringsRouter'

export const DSOTopOffers = () => {
  const { data, status } = useTopDSOs()

  if (status === 'loading') {
    return null
  }

  const topDSOs = data.list

  return (
    <DSOCarousel totalSlides={topDSOs.length}>
      {topDSOs.map((dso, i) => (
        <Slide index={i} className='custom'>
          <DSOOfferCard dso={dso} viewURL={OfferingRoute.view} />
        </Slide>
      ))}
    </DSOCarousel>
  )
}
