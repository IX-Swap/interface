import { DisableAccountsButton } from 'app/pages/admin/components/DisableAccountsButton/DisableAccountsButton'
import { itemComparator } from 'app/pages/admin/pages/VirtualAccounts'
import { SelectionHelper } from 'components/SelectionHelper'
import React from 'react'
import { render } from 'test-utils'

describe('DisableAccountsButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <SelectionHelper itemComparator={itemComparator}>
        <DisableAccountsButton />
      </SelectionHelper>
    )
  })
})
