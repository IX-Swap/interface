import React from 'react'
import { DSOList } from 'v2/app/components/DSO/components/DSOList'
import { OfferingRoute } from 'v2/app/pages/invest/routers/offeringsRouter'

export const OfferingsList = () => {
  return <DSOList viewURL={OfferingRoute.view} />
}
