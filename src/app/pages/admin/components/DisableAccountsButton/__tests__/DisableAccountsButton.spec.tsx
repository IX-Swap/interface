import { DisableAccountsButton } from 'app/pages/admin/components/DisableAccountsButton/DisableAccountsButton'
import { itemComparator } from 'app/pages/admin/pages/VirtualAccounts'
import { SelectionHelper } from 'components/SelectionHelper'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DisableAccountsButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <SelectionHelper itemComparator={itemComparator}>
        <DisableAccountsButton />
      </SelectionHelper>
    )
  })
})
