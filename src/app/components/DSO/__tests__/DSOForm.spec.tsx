import { DSOForm, getCreateModeRedirect } from 'app/components/DSO/DSOForm'
import React from 'react'
import { render } from 'test-utils'
import * as useSetPageTitle from 'app/hooks/useSetPageTitle'
import * as useCreateDSO from 'app/pages/issuance/hooks/useCreateDSO'
import * as useSubmitDSO from 'app/pages/issuance/hooks/useSubmitDSO'
import * as useUpdateDSO from 'app/pages/issuance/hooks/useUpdateDSO'
import { dsoFormSteps } from 'app/components/DSO/steps'
import { DSOStepper } from 'app/components/DSO/DSOFormStepper'

jest.mock('app/components/DSO/DSOFormStepper', () => ({
  DSOStepper: jest.fn(() => null)
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
    expect(DSOStepper).toHaveBeenCalledWith(
      expect.objectContaining({
        formTitle: 'Create DSO' || 'Edit DSO',
        steps: dsoFormSteps,
        createMutation: [createDSO, { isLoading: false }],
        editMutation: [updateDSO, { isLoading: false }],
        submitMutation: [submitDSO, { isLoading: false }],
        submitText: 'DSO',
        isRequiredOnLastStep: true,
        redirectFunction: getCreateModeRedirect,
        isNew: true
      }),
      {}
    )
  })
})
