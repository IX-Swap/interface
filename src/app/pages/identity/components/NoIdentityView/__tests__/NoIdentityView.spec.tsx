import { NoIdentityView } from 'app/pages/identity/components/NoIdentityView/NoIdentityView'
import React from 'react'
import { render } from 'test-utils'

describe('NoIdentityView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<NoIdentityView />)
  })
})
