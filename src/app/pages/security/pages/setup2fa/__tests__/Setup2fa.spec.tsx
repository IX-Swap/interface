import React from 'react'
import { render } from 'test-utils'
import { Setup2fa } from 'app/pages/security/pages/setup2fa/Setup2fa'

describe('Setup2fa', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(<Setup2fa />)
    expect(container).toMatchSnapshot()
  })

  it('renders Next button if step is not last', () => {
    const { queryByRole } = render(<Setup2fa />)

    const nextButton = queryByRole('button')
    expect(nextButton).not.toBeNull()
  })

  it('does not render Next button if step is last', () => {
    const { queryByText } = render(<Setup2fa />)

    expect(queryByText('Next')).not.toBeTruthy()
  })
})
