import React from 'react'

import { Offer } from 'state/launchpad/types'
import { OfferAdditionalDocs } from './OfferAdditionalDocs'
import { OfferContact } from './OfferContact'

import { OfferDetails } from './OfferDetails'
import { OfferSaleAllocation, OfferPreSaleInfo } from './OfferSaleAllocation'
import { OfferStage } from './OfferStage'
import { OfferTerms } from './OfferTerms'
// import { OfferVesting } from './OfferVesting'

interface Props {
  offer: Offer
}

export const OfferSidebar: React.FC<Props> = (props) => {
  return (
    <>
      <OfferDetails offer={props.offer} />
      <OfferSaleAllocation {...props.offer} />
      {props.offer.hasPresale && <OfferPreSaleInfo {...props.offer} />}
      <OfferStage frames={props.offer.timeframe} />
      <OfferTerms terms={props.offer.terms} />
      {/* <OfferVesting offer={props.offer} /> */}
      <OfferAdditionalDocs files={props.offer.files} />
      <OfferContact email={props.offer.contactUsEmail} />
    </>
  )
}