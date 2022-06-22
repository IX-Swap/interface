import React from 'react'
import { render } from 'test-utils'
import { Step4Enable } from 'app/pages/security/components/Step4Enable/Step4Enable'

describe('Step4Enable', () => {
  const nextStep = jest.fn()

  it('should match snapshot', () => {
    const { container } = render(<Step4Enable nextStep={nextStep} />)
    expect(container).toMatchSnapshot()
  })
})
