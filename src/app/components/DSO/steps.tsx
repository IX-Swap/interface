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
import {
  getCompanyInformationFormValues,
  getDocumentsFormValues,
  getSTOInformationFormValues
} from './utils'
import {
  getDSOCompanyInformationPayload,
  getDSODocumentsPayload,
  getDSOInformationRequestPayload
} from './requests'

export const dsoFormSteps = [
  {
    label: 'STO Information',
    getFormValues: (data: DSOFormValues) => {
      return {
        ...getSTOInformationFormValues(data),
        step: 1
      }
    },
    getRequestPayload: getDSOInformationRequestPayload,
    validationSchema: getDSOInformationSchema,
    component: () => <DSOInformationFields />
  },
  {
    label: 'Company Information',
    getFormValues: (data: DSOFormValues) => {
      return {
        ...getCompanyInformationFormValues(data),
        step: 2
      }
    },
    getRequestPayload: getDSOCompanyInformationPayload,
    validationSchema: getDSOCompanyInformationSchema,
    initialValidationSchema: getDSOCompanyInformationSchema,
    component: () => <DSOCompanyInformationFields />
  },
  {
    label: 'Documents',
    getFormValues: (data: DSOFormValues) => {
      return {
        ...getDocumentsFormValues(data),
        step: 3
      }
    },
    getRequestPayload: getDSODocumentsPayload,
    validationSchema: getDSODocumentschema,
    component: () => <DSODocumentsFields />
  }
]
