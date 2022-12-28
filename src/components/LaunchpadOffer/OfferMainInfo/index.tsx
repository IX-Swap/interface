import React from 'react'

import { Offer } from 'state/launchpad/types'

import { OfferQuestions } from './OfferFAQ'
import { OfferGallery } from './OfferGallery'
import { OfferOverview } from './OfferOverview'
import { OfferTeamMembers } from './OfferTeamMembers'

interface Props {
  offer: Offer
}

export const OfferMainInfo: React.FC<Props> = (props) => {
  return (
    <>
      <OfferGallery offer={props.offer} />
      <OfferOverview offer={props.offer} />
      <OfferTeamMembers team={props.offer.members} />
      <OfferQuestions faq={props.offer.faq} />
    </>
  )
}
