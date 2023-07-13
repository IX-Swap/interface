import React from 'react'
import { Slide } from 'pure-react-carousel'
import { DSOCarousel } from 'app/components/DSO/components/DSOCarousel/DSOCarousel'
import { usePromotedDSOs } from 'app/pages/invest/hooks/usePromotedDSOs'
import { InvestRoute } from 'app/pages/invest/router/config'
import Box from '@mui/material/Box'
import { DSOCard } from 'app/pages/invest/components/DSOCard/DSOCard'

export const PromotedDSOs = () => {
  const { data, status } = usePromotedDSOs()

  if (status === 'loading' || data.list.length === undefined) {
    return null
  }

  const promotedDSOs = data.list.slice(0, 9)

  return (
    <DSOCarousel totalSlides={promotedDSOs.length}>
      {promotedDSOs.map((dso, i) => (
        <Slide index={i} key={dso._id} className='custom'>
          <Box px={2} height='100%'>
            <DSOCard type={'TopOffers'} data={dso} viewURL={InvestRoute.view} />
          </Box>
        </Slide>
      ))}
    </DSOCarousel>
  )
}