import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { renderStringToHTML } from 'app/components/DSO/utils'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'

export interface DSOInformationViewProps {
  dso: DigitalSecurityOffering
  isNewThemeOn?: boolean
}

export const DSOInformationView = ({ dso }: DSOInformationViewProps) => {
  const items = [
    {
      label: 'Company Information',
      value: renderStringToHTML(dso.introduction)
    },
    {
      label: 'Business Model',
      value: renderStringToHTML(dso.businessModel)
    },
    {
      label: 'Use of Proceeds',
      value: renderStringToHTML(dso.useOfProceeds)
    },
    {
      label: 'Fundraising Milestones',
      value: renderStringToHTML(dso.fundraisingMilestone)
    }
  ]

  return <FieldGrid title={'Information Profile'} items={items} columns={2} />
}
