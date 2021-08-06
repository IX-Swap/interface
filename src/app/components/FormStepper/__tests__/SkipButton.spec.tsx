import { SkipButton } from 'app/components/FormStepper/SkipButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('SkipButton', () => {
  const save = jest.fn()
  const mutation = [save, { isLoading: false }] as any

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SkipButton mutation={mutation} />)
  })
})
