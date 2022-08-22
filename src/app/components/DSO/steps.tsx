import React from 'react'
import { getDSOValidationSchema } from 'validation/dso'

export const dsoFormSteps = [
  {
    label: 'DSO Information',
    getFormValues: () => ({}),
    getRequestPayload: () => ({}),
    validationSchema: getDSOValidationSchema,
    component: () => (
      <>
        <p>Step 1</p>
      </>
    )
  },
  {
    label: 'Company Information',
    getFormValues: () => ({}),
    getRequestPayload: () => ({}),
    validationSchema: getDSOValidationSchema,
    component: () => (
      <>
        <p>Step 2</p>
      </>
    )
  },
  {
    label: 'Documents',
    getFormValues: () => ({}),
    getRequestPayload: () => ({}),
    validationSchema: getDSOValidationSchema,
    component: () => (
      <>
        <p>Step 3</p>
      </>
    )
  }
]
