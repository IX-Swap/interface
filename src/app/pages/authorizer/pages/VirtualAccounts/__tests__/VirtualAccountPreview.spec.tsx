import { VirtualAccountPreview } from 'app/pages/authorizer/pages/VirtualAccounts/VirtualAccountPreview'
import React from 'react'
import { render } from 'test-utils'
import { virtualAccount } from '__fixtures__/virtualAccount'

describe('VirtualAccountPreview', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<VirtualAccountPreview data={virtualAccount} />)
  })
})
