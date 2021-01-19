import React, { Fragment } from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { DSOBaseFieldsView } from 'app/components/DSO/DSOPreview/DSOBaseFieldsView'
import { VSpacer } from 'components/VSpacer'
import { DSOPricingView } from 'app/components/DSO/DSOPreview/DSOPricingView'
import { DSOTermsView } from 'app/components/DSO/DSOPreview/DSOTermsView'
import { DSOInformationView } from 'app/components/DSO/DSOPreview/DSOInformationView'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'
import { Element } from 'react-scroll'
import { DSOFormSection } from 'app/components/DSO/DSOScrollGuide'
import { DSODataroomView } from 'app/components/DSO/components/DSODataroomView'

export interface DSOPreviewProps {
  data: DigitalSecurityOffering
  showAuthorizations?: boolean
}

export const DSOPreview = (props: DSOPreviewProps) => {
  const { data } = props

  useSetPageTitle(data.tokenName)

  return (
    <Fragment>
      <Element name={DSOFormSection['DSO Information']}>
        <DSOBaseFieldsView dso={data} />
      </Element>

      <Element name={DSOFormSection.Pricing}>
        <VSpacer size='large' />
        <DSOPricingView dso={data} />
      </Element>

      <Element name={DSOFormSection['Offering Terms']}>
        <VSpacer size='large' />
        <DSOTermsView dso={data} />
      </Element>

      <Element name={DSOFormSection.Information}>
        <VSpacer size='large' />
        <DSOInformationView dso={data} />
      </Element>

      <Element name={DSOFormSection['Upload Documents']}>
        <VSpacer size='large' />
        <DSODataroomView dso={data} />
      </Element>

      <Element name={DSOFormSection['Team Members']}>
        <VSpacer size='large' />
        <DSOTeamView dso={data} />
      </Element>
    </Fragment>
  )
}
