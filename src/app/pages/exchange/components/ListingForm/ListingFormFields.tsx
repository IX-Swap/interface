import React, { Fragment } from 'react'
import { VSpacer } from 'components/VSpacer'
import { Element } from 'react-scroll'
import { ListingFormSection } from 'app/pages/exchange/components/ListingForm/ListingScrollGuide'
import { ListingDataroom } from 'app/pages/exchange/components/ListingForm/ListingDataroom'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { ListingInformationProfile } from 'app/pages/exchange/components/ListingForm/ListingInformationProfile'
import { ListingPricing } from 'app/pages/exchange/components/ListingForm/ListingPricing'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { ListingMarketInfo } from 'app/pages/exchange/components/ListingForm/ListingMarketInfo'
import { ListingBaseFields } from 'app/pages/exchange/components/ListingForm/ListingBaseFields'

export interface ListingFormFieldsProps {
  isNew: boolean
  isLive: boolean
}

export const ListingFormFields = (props: ListingFormFieldsProps) => {
  const { isNew, isLive } = props

  return (
    <Fragment>
      <Element name={ListingFormSection['General Information']}>
        <VSpacer size='large' />
        General Information
        <ListingBaseFields isNew={isNew} isLive={isLive} />
      </Element>

      <Element name={ListingFormSection.Market}>
        <VSpacer size='large' />
        <ListingMarketInfo />
      </Element>

      <Element name={ListingFormSection.Pricing}>
        <VSpacer size='large' />
        <ListingPricing />
      </Element>

      <Element name={ListingFormSection['Offering Terms']}>
        <VSpacer size='large' />
        <DSOTerms />
      </Element>

      <Element name={ListingFormSection['Upload Documents']}>
        <VSpacer size='large' />
        <ListingDataroom />
      </Element>

      <Element name={ListingFormSection['Information Profile']}>
        <VSpacer size='large' />
        <ListingInformationProfile />
      </Element>

      <Element name={ListingFormSection['Team Members']}>
        <VSpacer size='large' />
        <DSOTeam />
      </Element>
    </Fragment>
  )
}
