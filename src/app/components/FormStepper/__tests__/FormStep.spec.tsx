import { FormStep } from 'app/components/FormStepper/FormStep'
import { IdentityRoute } from 'app/pages/identity/router/config'
import React from 'react'
import { render, cleanup, waitFor, fireEvent } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { generateMutationResult } from '__fixtures__/useQuery'
import { SaveOnNavigate } from 'app/components/FormStepper/SaveOnNavigate'

jest.mock('app/components/FormStepper/SaveOnNavigate', () => ({
  SaveOnNavigate: jest.fn(() => null)
}))

describe('FormStep', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  const setActiveStep = jest.fn()
  const setCompleted = jest.fn()
  const getFormValues = jest.fn()
  const getRequestPayload = jest.fn()
  const validationSchema = {}
  const component = jest.fn(() => <></>)
  const createMutation = [
    jest.fn(),
    generateMutationResult({ data: corporate })
  ]
  const editMutation = [jest.fn(), generateMutationResult({ data: corporate })]
  const submitMutation = [
    jest.fn(),
    generateMutationResult({ data: corporate })
  ]

  const defaultProps = {
    step: {
      label: 'Corporate Information',
      getFormValues: getFormValues,
      getRequestPayload: getRequestPayload,
      validationSchema: validationSchema,
      initialValidationSchema: validationSchema,
      component: component,
      formId: 'information'
    },
    data: corporate,
    index: 0,
    activeStep: 0,
    setActiveStep: setActiveStep,
    totalSteps: 1,
    editMutation: editMutation as any,
    submitMutation: submitMutation as any,
    createMutation: createMutation as any,
    shouldSaveOnMove: false,
    setCompleted: setCompleted,
    skippable: true,
    completed: [],
    createModeRedirect: IdentityRoute.editCorporate
  }

  it('renders without errors', () => {
    render(<FormStep {...defaultProps} />)
  })

  it('renders Next button when there are multiple steps', () => {
    const props = { ...defaultProps, totalSteps: 2 }
    const { getByText } = render(<FormStep {...props} />)
    const nextButton = getByText('Next')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).toHaveAttribute('type', 'button')
  })

  it('renders Skip button when skippable is true', () => {
    const props = { ...defaultProps, totalSteps: 2 }
    const { getByText } = render(<FormStep {...props} />)
    const skipButton = getByText('SKIP THIS')
    expect(skipButton).toBeInTheDocument()
    expect(skipButton).toHaveAttribute('type', 'button')
  })

  it('renders Back button when there are multiple steps and active step is not the last', () => {
    const props = { ...defaultProps, activeStep: 1, totalSteps: 5, index: 1 }
    const { getByText } = render(<FormStep {...props} />)
    const backButton = getByText('Back')
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveAttribute('type', 'button')
  })

  it('renders with edit mutation when data is defined', async () => {
    render(<FormStep {...defaultProps} />)
    expect(SaveOnNavigate).toBeCalledWith(
      expect.objectContaining({
        mutation: editMutation
      }),
      {}
    )
  })

  it('renders with create mutation when data is undefined', async () => {
    const props = { ...defaultProps, data: undefined }
    render(<FormStep {...props} />)
    expect(SaveOnNavigate).toBeCalledWith(
      expect.objectContaining({
        mutation: createMutation
      }),
      {}
    )
  })
})
