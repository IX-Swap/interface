import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'
import { DSODocumentsFields } from 'app/components/DSO/components/DSODocumentsFields'
import { DSOStep1 } from 'app/components/DSO/components/DSOStep1'
import React from 'react'
import { DSOFormValues } from 'types/dso'
import { getDSOValidationSchemaStep1 } from 'validation/dso'
import { transformDSOToFormValuesStep1 } from './utils'

export const dsoFormSteps = [
  {
    label: 'DSO Information',
    getFormValues: transformDSOToFormValuesStep1,
    getRequestPayload: {},
    validationSchema: getDSOValidationSchemaStep1,
    component: () => <DSOStep1 />
  },
  {
    label: 'Company Information',
    getFormValues: () => {},
    getRequestPayload: {},
    validationSchema: {},
    component: () => <p>Step 2</p>
  },
  {
    label: 'Documents',
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
