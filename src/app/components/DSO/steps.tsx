import React from 'react'
import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'
import { DSOFormValues } from 'types/dso'

export const dsoFormSteps = [
  {
    label: 'DSO Information',
    getFormValues: () => {},
    getRequestPayload: {},
    validationSchema: {},
    component: () => (
      <>
        <p>Step 1</p>
      </>
    )
  },
  {
    label: 'Company Information',
    getFormValues: (data: DSOFormValues) => {
      return {
        team: data.team ?? [{}],
        introduction: data.introduction,
        businessModel: data.businessModel,
        useOfProceeds: data.useOfProceeds,
        fundraisingMilestone: data.fundraisingMilestone
      }
    },
    getRequestPayload: (values: any) => {
      return values
    },
    validationSchema: {},
    component: () => <DSOCompanyInformationFields />
  },
  {
    label: 'Documents',
    getFormValues: () => {},
    getRequestPayload: {},
    validationSchema: {},
    component: () => (
      <>
        <p>Step 3</p>
      </>
    )
  }
]
