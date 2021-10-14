import React from 'react'
import { render, cleanup } from 'test-utils'
import { ListedTokensDialog } from 'app/pages/admin/components/ListedTokensDialog/ListedTokensDialog'

describe('ListedTokensDialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ListedTokensDialog currentCustodian={'HEX'} />)
  })
})
