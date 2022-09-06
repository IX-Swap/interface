import React from 'react'
import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'
import { DSOFormValues } from 'types/dso'
import { DSODocumentsFields } from 'app/components/DSO/components/DSODocumentsFields'
import { DSOStep1 } from './components/DSOStep1'

export const dsoFormSteps = [
  {
    label: 'DSO Information',
    getFormValues: (data: DSOFormValues) => {
      return {
        tokenName: data.tokenName
      }
    },
    getRequestPayload: {},
    validationSchema: {},
    component: () => <DSOStep1 />
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
    getFormValues: (data: DSOFormValues) => {
      return {
        subscriptionDocument: data.subscriptionDocument,
        documents: data.documents,
        videos: data.videos ?? [{}],
        faqs: data.faqs ?? [{}]
      }
    },
    getRequestPayload: {},
    validationSchema: {},
    component: () => <DSODocumentsFields />
  }
]
