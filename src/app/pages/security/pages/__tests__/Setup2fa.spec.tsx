import React from 'react'
import { render } from 'test-utils'
import { Setup2FA } from 'app/pages/security/pages/setup2faguide/components/Setup2FA'

describe('Setup2FA', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Next button if step is not last', () => {
    const { queryByRole } = render(<Setup2FA />)

    const nextButton = queryByRole('button')
    expect(nextButton).not.toBeNull()
  })

  it('does not render Next button if step is last', () => {
    const { queryByText } = render(<Setup2FA />)

    expect(queryByText('Next')).not.toBeTruthy()
  })
})
