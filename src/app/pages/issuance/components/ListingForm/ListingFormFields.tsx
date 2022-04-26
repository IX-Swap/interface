import React, { Fragment } from 'react'
import { VSpacer } from 'components/VSpacer'
import { Element } from 'react-scroll'
import { ListingFormSection } from 'app/pages/issuance/components/ListingForm/ListingScrollGuide'
import { ListingDataroom } from 'app/pages/issuance/components/ListingForm/ListingDataroom'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { ListingInformationProfile } from 'app/pages/issuance/components/ListingForm/ListingInformationProfile'
import { ListingPricing } from 'app/pages/issuance/components/ListingForm/ListingPricing'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { ListingMarketInfo } from 'app/pages/issuance/components/ListingForm/ListingMarketInfo'
import { ListingBaseFields } from 'app/pages/issuance/components/ListingForm/ListingBaseFields'

export interface ListingFormFieldsProps {
  isNew: boolean
  isLive: boolean
  isDataFromDSO: boolean
}

export const ListingFormFields = (props: ListingFormFieldsProps) => {
  const { isNew, isLive, isDataFromDSO } = props

  return (
    <Fragment>
      <Element
        name={ListingFormSection['General Information']}
        style={{ maxWidth: '100%' }}
      >
        <ListingBaseFields
          isNew={isNew}
          isLive={isLive}
          isDataFromDSO={isDataFromDSO}
        />
      </Element>

      <Element name={ListingFormSection.Market} style={{ maxWidth: '100%' }}>
        <VSpacer size='large' />
        <ListingMarketInfo />
      </Element>

      <Element name={ListingFormSection.Pricing} style={{ maxWidth: '100%' }}>
        <VSpacer size='large' />
        <ListingPricing />
      </Element>

      <Element
        name={ListingFormSection['Offering Terms']}
        style={{ maxWidth: '100%' }}
      >
        <VSpacer size='large' />
        <DSOTerms />
      </Element>

      <Element
        name={ListingFormSection['Upload Documents']}
        style={{ maxWidth: '100%' }}
      >
        <VSpacer size='large' />
        <ListingDataroom />
      </Element>

      <Element
        name={ListingFormSection['Information Profile']}
        style={{ maxWidth: '100%' }}
      >
        <VSpacer size='large' />
        <ListingInformationProfile />
      </Element>

      <Element
        name={ListingFormSection['Team Members']}
        style={{ maxWidth: '100%' }}
      >
        <VSpacer size='large' />
        <DSOTeam />
      </Element>
    </Fragment>
  )
}
