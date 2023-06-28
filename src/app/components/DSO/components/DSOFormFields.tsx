import React, { Fragment } from 'react'
import { STOInformation } from 'app/components/DSO/components/fields/STOInformation'
import { DSODataroom } from 'app/components/DSO/components/DSODataroom'
import { DSOInformationProfile } from 'app/components/DSO/components/DSOInformationProfile'
import { Pricing } from 'app/components/DSO/components/fields/Pricing'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { OfferingTerms } from 'app/components/DSO/components/fields/OfferingTerms'
import { DSOFormSection } from 'app/components/DSO/DSOScrollGuide'
import { VSpacer } from 'components/VSpacer'
import { Element } from 'react-scroll'
import { DSOFAQs } from 'app/components/DSO/components/DSOFAQs'
import { DSOVideoLinks } from 'app/components/DSO/components/DSOVideoLinks'

export const DSOFormFields = () => {
  return (
    <Fragment>
      <Element name={DSOFormSection['STO Information']}>
        <STOInformation />
      </Element>

      <Element name={DSOFormSection.Pricing}>
        <VSpacer size='large' />
        <Pricing />
      </Element>

      <Element name={DSOFormSection['Offering Terms']}>
        <VSpacer size='large' />
        <OfferingTerms />
      </Element>

      <Element name={DSOFormSection.Information}>
        <VSpacer size='large' />
        <DSOInformationProfile />
      </Element>

      <Element name={DSOFormSection['Team Members']}>
        <VSpacer size='large' />
        <DSOTeam />
      </Element>

      <Element name={DSOFormSection.Documents}>
        <VSpacer size='large' />
        <DSODataroom />
      </Element>

      <Element name={DSOFormSection.Videos}>
        <VSpacer size='large' />
        <DSOVideoLinks />
      </Element>

      <Element name={DSOFormSection.FAQs}>
        <VSpacer size='large' />
        <DSOFAQs />
      </Element>
    </Fragment>
  )
}
