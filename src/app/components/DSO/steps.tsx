import React from 'react'
import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'
import { DSODocumentsFields } from 'app/components/DSO/components/DSODocumentsFields'
import { DSOFormValues } from 'types/dso'
import { DSOInformationFields } from 'app/components/DSO/components/DSOInformationFields'
<<<<<<< Updated upstream
import {
  getDSOInformationSchema,
  getDSOCompanyInformationSchema,
  getDSODocumentschema
} from 'validation/dso'
import { getDSOInformationFormValues } from './utils'
import {
  getDSOCompanyInformationPayload,
  getDSODocumentsPayload,
  getDSOInformationRequestPayload
} from './requests'
import { isEqual } from 'lodash'
=======
import { getDSOInformationSchema } from 'validation/dso'
import { getDSOInformationFormValues } from './utils'
import { getDSOInformationRequestPayload } from './requests'
>>>>>>> Stashed changes

export const dsoFormSteps = [
  {
    label: 'DSO Information',
    getFormValues: getDSOInformationFormValues,
    getRequestPayload: getDSOInformationRequestPayload,
    validationSchema: getDSOInformationSchema,
    component: () => <DSOInformationFields />
  },
  {
    label: 'Company Information',
    getFormValues: (data: DSOFormValues) => {
      return {
<<<<<<< Updated upstream
        team: data.team.length > 0 ? [...data.team] : [{}],
        introduction: data.introduction ?? '',
        businessModel: data.businessModel ?? '',
        useOfProceeds: data.useOfProceeds ?? '',
        fundraisingMilestone: data.fundraisingMilestone ?? '',
        step: 2
      }
    },
    getRequestPayload: getDSOCompanyInformationPayload,
    validationSchema: getDSOCompanyInformationSchema,
    initialValidationSchema: getDSOCompanyInformationSchema,
=======
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
>>>>>>> Stashed changes
    component: () => <DSOCompanyInformationFields />
  },
  {
    label: 'Documents',
    getFormValues: (data: DSOFormValues) => {
<<<<<<< Updated upstream
      const videos: any[] = []
      const faqs: any[] = []

      data.videos.forEach(item => {
        if (!isEqual(item, {})) videos.push(item)
      })
      data.faqs.forEach(item => {
        if (!isEqual(item, {})) faqs.push(item)
      })
      return {
        subscriptionDocument: data.subscriptionDocument,
        documents: data.documents,
        videos: videos.length > 0 ? [...videos, {}] : [{}, {}],
        faqs: faqs.length > 0 ? [...faqs, {}] : [{}, {}],
        step: 3
      }
    },
    getRequestPayload: getDSODocumentsPayload,
    validationSchema: getDSODocumentschema,
=======
      return {
        subscriptionDocument: data.subscriptionDocument,
        documents: data.documents,
        videos: data.videos ?? [{}],
        faqs: data.faqs ?? [{}]
      }
    },
    getRequestPayload: {},
    validationSchema: {},
>>>>>>> Stashed changes
    component: () => <DSODocumentsFields />
  }
]
