import React from 'react'
import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'
import { DSODocumentsFields } from 'app/components/DSO/components/DSODocumentsFields'
import { DSOFormValues } from 'types/dso'
import { DSOInformationFields } from 'app/components/DSO/components/DSOInformationFields'
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
        team: data.team.length > 0 ? [...data.team, {}] : [{}],
        introduction: data.introduction ?? '',
        businessModel: data.businessModel ?? '',
        useOfProceeds: data.useOfProceeds ?? '',
        fundraisingMilestone: data.fundraisingMilestone ?? '',
        step: 2
      }
    },
    getRequestPayload: getDSOCompanyInformationPayload,
    validationSchema: getDSOCompanyInformationSchema,
    // initialValidationSchema: getDSOCompanyInformationSchema,
    component: () => <DSOCompanyInformationFields />
  },
  {
    label: 'Documents',
    getFormValues: (data: DSOFormValues) => {
      const dataroomProperties: any = {}
      const videos: any[] = []
      const faqs: any[] = []
      data.documents.forEach((item, index) => {
        dataroomProperties[`dataroom_${index}`] = item.value
      })
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
        step: 3,
        ...dataroomProperties
      }
    },
    getRequestPayload: getDSODocumentsPayload,
    validationSchema: getDSODocumentschema,
    component: () => <DSODocumentsFields />
  }
]
