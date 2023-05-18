import React from 'react'
import { render } from 'test-utils'
import {
  StepWrapper,
  StepWrapperProps
} from 'app/pages/security/components/StepWrapper'

describe('StepWrapper', () => {
  const mockChild = jest.fn(() => <div />)
  const props: StepWrapperProps = {
    title: 'Authenticator',
    children: mockChild
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders props correctly', () => {
    const { getByText } = render(<StepWrapper {...props} />)

    expect(getByText('Authenticator')).toBeTruthy()
  })
})