import { IndividualIdentityButton } from 'app/pages/identity/components/IdentityPreview/IndividualIdentityButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('IndividualIdentityButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IndividualIdentityButton active={true} onClick={() => {}} />)
  })
})
