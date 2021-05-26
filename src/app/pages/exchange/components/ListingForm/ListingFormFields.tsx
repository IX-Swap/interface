import React, { Fragment } from 'react'
import { VSpacer } from 'components/VSpacer'
import { Element } from 'react-scroll'
import { ListingFormSection } from 'app/pages/exchange/components/ListingForm/ListingScrollGuide'
import { ListingInformationProfile } from 'app/pages/exchange/components/ListingForm/ListingInformationProfile'

export interface ListingFormFieldsProps {
  isNew: boolean
  isLive: boolean
}

export const ListingFormFields = (props: ListingFormFieldsProps) => {
  // const { isNew, isLive } = props

  return (
    <Fragment>
      <Element name={ListingFormSection['General Information']}>
        General Information
      </Element>

      <Element name={ListingFormSection.Market}>
        <VSpacer size='large' />
        Market
      </Element>

      <Element name={ListingFormSection.Pricing}>
        <VSpacer size='large' />
        Pricing
      </Element>

      <Element name={ListingFormSection['Offering Terms']}>
        <VSpacer size='large' />
        Offering Terms
      </Element>

      <Element name={ListingFormSection['Upload Documents']}>
        <VSpacer size='large' />
        Upload Documents
      </Element>

      <Element name={ListingFormSection['Information Profile']}>
        <VSpacer size='large' />
        <ListingInformationProfile />
      </Element>

      <Element name={ListingFormSection['Team Members']}>
        <VSpacer size='large' />
        Team Members
      </Element>
    </Fragment>
  )
}
