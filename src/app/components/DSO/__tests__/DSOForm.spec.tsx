import { DSOForm, DSOFormProps } from 'app/components/DSO/DSOForm'
import { FormStepper } from 'app/components/FormStepper/FormStepper'
import React from 'react'
import { render } from 'test-utils'
import { dso } from '__fixtures__/authorizer'
import * as useSetPageTitle from 'app/hooks/useSetPageTitle'
import * as useCreateDSO from 'app/pages/issuance/hooks/useCreateDSO'
import * as useSubmitDSO from 'app/pages/issuance/hooks/useSubmitDSO'
import * as useUpdateDSO from 'app/pages/issuance/hooks/useUpdateDSO'
import { dsoFormSteps } from 'app/components/DSO/steps'
import {
  getCreateModeRedirect,
  redirectCallback,
  redirectOnSave,
  transformDSOToFormValues
} from '../utils'

jest.mock('app/components/FormStepper/FormStepper', () => ({
  FormStepper: jest.fn(() => null)
}))

describe('DSOForm', () => {
  const createDSO = jest.fn()
  const updateDSO = jest.fn()
  const submitDSO = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useCreateDSO, 'useCreateDSO')
      .mockImplementation(() => [createDSO, { isLoading: false } as any])

    jest
      .spyOn(useUpdateDSO, 'useUpdateDSO')
      .mockImplementation(() => [updateDSO, { isLoading: false } as any])

    jest
      .spyOn(useSubmitDSO, 'useSubmitDSO')
      .mockImplementation(() => [submitDSO, { isLoading: false } as any])

    jest
      .spyOn(useSetPageTitle, 'useSetPageTitle')
      .mockImplementation(() => undefined)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders form field components', () => {
    render(<DSOForm />)
    expect(FormStepper).toHaveBeenCalledTimes(1)
  })
})
