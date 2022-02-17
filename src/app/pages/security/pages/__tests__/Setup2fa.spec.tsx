import React from 'react'
import { render } from 'test-utils'
import { Setup2FA } from 'app/pages/security/pages/setup2faguide/components/Setup2FA'

describe('Setup2FA', () => {
  it('does not render Next button if step is last', () => {
    const { queryByText } = render(<Setup2FA />)

    expect(queryByText('Next')).not.toBeTruthy()
  })
})
