import React, { Fragment } from 'react'
import { DSOBaseFields } from 'app/components/DSO/components/DSOBaseFields'
import { DSODataroom } from 'app/components/DSO/components/DSODataroom'
import { DSOInformationProfile } from 'app/components/DSO/components/DSOInformationProfile'
import { DSOPricing } from 'app/components/DSO/components/DSOPricing'
import { DSOTeam } from 'app/components/DSO/components/DSOTeam'
import { DSOTerms } from 'app/components/DSO/components/DSOTerms'
import { DSOFormSection } from 'app/components/DSO/DSOScrollGuide'
import { VSpacer } from 'components/VSpacer'
import { Element } from 'react-scroll'

export interface DSOFormFieldsProps {
  isNew: boolean
  isLive: boolean
}

export const DSOFormFields = (props: DSOFormFieldsProps) => {
  const { isNew, isLive } = props

  return (
    <Fragment>
      <Element name={DSOFormSection['DSO Information']}>
        <DSOBaseFields isNew={isNew} isLive={isLive} />
      </Element>

      <Element name={DSOFormSection.Pricing}>
        <VSpacer size='large' />
        <DSOPricing />
      </Element>

      <Element name={DSOFormSection['Offering Terms']}>
        <VSpacer size='large' />
        <DSOTerms />
      </Element>

      <Element name={DSOFormSection.Information}>
        <VSpacer size='large' />
        <DSOInformationProfile />
      </Element>

      <Element name={DSOFormSection['Upload Documents']}>
        <VSpacer size='large' />
        <DSODataroom />
      </Element>

      <Element name={DSOFormSection['Team Members']}>
        <VSpacer size='large' />
        <DSOTeam />
      </Element>
    </Fragment>
  )
}
