import React from 'react'
import { DSOList } from 'app/components/DSO/components/DSOList'
import { OfferingRoute } from 'app/pages/invest/routers/offeringsRouter'

export const OfferingsList = () => {
  return <DSOList viewURL={OfferingRoute.view} />
}
