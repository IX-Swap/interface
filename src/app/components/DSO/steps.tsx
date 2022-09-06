import React from 'react'
import { DSOStep1 } from 'app/components/DSO/components/DSOStep1'
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
    getFormValues: () => {},
    getRequestPayload: {},
    validationSchema: {},
    component: () => <p>Step 3</p>
  }
]
