import React from 'react'
import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'

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
    getFormValues: () => {},
    getRequestPayload: (values: any) => {
      console.log('values', values)
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
