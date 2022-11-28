import React from 'react'

import { Offer } from 'state/launchpad/types'
import { OfferAdditionalDocs } from './OfferAdditionalDocs'
import { OfferContact } from './OfferContact'

import { OfferDetails } from './OfferDetails'
import { OfferSaleAllocation, OfferPreSaleInfo } from './OfferSaleAllocation'
import { OfferStage } from './OfferStage'
import { OfferTerms } from './OfferTerms'

interface Props {
  offer: Offer
}

export const OfferSidebar: React.FC<Props> = (props) => {
  return (
    <>
      <OfferDetails offer={props.offer} />
      <OfferSaleAllocation offer={props.offer} />
      <OfferPreSaleInfo offer={props.offer} />
      <OfferStage offer={props.offer} />
      <OfferTerms offer={props.offer} />
      <OfferAdditionalDocs files={props.offer.files} />
      <OfferContact offer={props.offer} />
    </>
  )
}
