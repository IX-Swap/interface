import React from 'react'

import { Offer } from 'state/launchpad/types'
import { OfferAdditionalDocs } from './OfferAdditionalDocs'
import { OfferContact } from './OfferContact'

import { OfferDetails } from './OfferDetails'
import { OfferSaleAllocation, OfferPreSaleInfo } from './OfferSaleAllocation'
import { OfferStage } from './OfferStage'
import { OfferTerms } from './OfferTerms'
import { OfferQuestions } from '../OfferMainInfo/OfferFAQ'
import { OfferOverview } from '../OfferMainInfo/OfferOverview'
import { OfferTeamMembers } from '../OfferMainInfo/OfferTeamMembers'
import { isMobile } from 'react-device-detect'
import { OfferVesting } from './OfferVesting'
// import { OfferVesting } from './OfferVesting'

interface Props {
  offer: Offer
}

export const OfferSidebar: React.FC<Props> = (props) => {
  return (
    <>
      {isMobile ? (
        <>

          <OfferDetails offer={props.offer} />
          <OfferOverview offer={props.offer} />
          <OfferTeamMembers team={props.offer.members} />
          <OfferQuestions faq={props.offer.faq} />
          <OfferSaleAllocation {...props.offer} />
          {props.offer.hasPresale && <OfferPreSaleInfo {...props.offer} />}
          <OfferTerms terms={props.offer.terms} />
          <OfferAdditionalDocs files={props.offer.files} />
          <OfferStage frames={props.offer.timeframe} />
          <OfferContact email={props.offer.contactUsEmail} />
             {/* <OfferVesting offer={props.offer} /> */}
        </>
      ) : (
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
      )}
    </>
  )
}
