import React from 'react'
import { render } from 'test-utils'
import { ListedTokensDialog } from 'app/pages/admin/components/ListedTokensDialog/ListedTokensDialog'

describe('ListedTokensDialog', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ListedTokensDialog currentCustodian={'HEX'} />)
  })
})
