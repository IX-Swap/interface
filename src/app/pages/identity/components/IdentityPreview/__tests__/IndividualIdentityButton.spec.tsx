import { IndividualIdentityButton } from 'app/pages/identity/components/IdentityPreview/IndividualIdentityButton'
import React from 'react'
import { render } from 'test-utils'

describe('IndividualIdentityButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<IndividualIdentityButton active={true} onClick={() => {}} />)
  })
})
