import React from 'react'

export const dsoFormSteps = [
  {
    label: 'DSO Information',
    getFormValues: () => null,
    getRequestPayload: {},
    validationSchema: {},
    component: () => <p>Step 1</p>
  },
  {
    label: 'Company Information',
    getFormValues: () => null,
    getRequestPayload: {},
    validationSchema: {},
    component: () => <p>Step 2</p>
  },
  {
    label: 'Documents',
    getFormValues: () => null,
    getRequestPayload: {},
    validationSchema: {},
    component: () => <p>Step 3</p>
  }
]
