import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  StepWrapper,
  StepWrapperProps
} from 'app/pages/security/pages/setup2fa/components/StepWrapper'

describe('StepWrapper', () => {
  const mockChild = jest.fn(() => <div />)
  const props: StepWrapperProps = {
    title: 'Authenticator',
    children: mockChild
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<StepWrapper {...props} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<StepWrapper {...props} />)

    expect(getByText('Authenticator')).toBeTruthy()
  })
})
