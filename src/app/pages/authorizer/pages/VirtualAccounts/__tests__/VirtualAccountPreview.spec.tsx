import { VirtualAccountPreview } from 'app/pages/authorizer/pages/VirtualAccounts/VirtualAccountPreview'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { virtualAccount } from '__fixtures__/virtualAccount'

describe('VirtualAccountPreview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<VirtualAccountPreview data={virtualAccount} />)
  })
})
