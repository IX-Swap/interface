import React from 'react'
import { render } from 'test-utils'
import { Update2fa } from 'app/pages/security/pages/update2fa/Update2fa'

describe('Update2fa', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Next button if step is not last', () => {
    const { queryByRole } = render(<Update2fa />)

    const nextButton = queryByRole('button')
    expect(nextButton).not.toBeNull()
  })

  it('does not render Next button if step is last', () => {
    const { queryByText } = render(<Update2fa />)

    expect(queryByText('Next')).not.toBeTruthy()
  })
})
