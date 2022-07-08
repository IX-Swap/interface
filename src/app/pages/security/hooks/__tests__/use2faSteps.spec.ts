import { renderHook, act } from '@testing-library/react-hooks'
import { use2faSteps } from 'app/pages/security/hooks/use2faSteps'
import { waitFor } from '@testing-library/dom'

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']

describe('use2faSteps', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('return correct default values', async () => {
    const { result } = renderHook(() => use2faSteps(steps))

    expect(result.current.activeStep).toEqual(0)
    expect(result.current.stepperConditions(0).active).toEqual(true)
    expect(result.current.stepperConditions(0).completed).toEqual(false)
    expect(result.current.stepperConditions(0).error).toEqual(false)
    expect(result.current.is2faCompleted).toEqual(false)
    expect(result.current.stepInfo).toEqual({
      activeStep: 1,
      label: 'Step 1',
      totalSteps: 4
    })
  })

  it('return correct values after invokes nextStep and prevStep functions', async () => {
    const { result } = renderHook(() => use2faSteps(steps))

    act(() => {
      result.current.nextStep()
    })

    await waitFor(() => {
      expect(result.current.activeStep).toEqual(1)
      expect(result.current.stepperConditions(0).active).toEqual(false)
      expect(result.current.stepperConditions(0).completed).toEqual(true)
      expect(result.current.stepperConditions(0).error).toEqual(false)
      expect(result.current.is2faCompleted).toEqual(false)
      expect(result.current.stepInfo).toEqual({
        activeStep: 2,
        label: 'Step 2',
        totalSteps: 4
      })
    })

    act(() => {
      result.current.prevStep()
    })

    await waitFor(() => {
      expect(result.current.activeStep).toEqual(0)
      expect(result.current.stepperConditions(0).active).toEqual(true)
      expect(result.current.stepperConditions(0).completed).toEqual(false)
      expect(result.current.stepperConditions(0).error).toEqual(false)
      expect(result.current.is2faCompleted).toEqual(false)
      expect(result.current.stepInfo).toEqual({
        activeStep: 1,
        label: 'Step 1',
        totalSteps: 4
      })
    })
  })
})
