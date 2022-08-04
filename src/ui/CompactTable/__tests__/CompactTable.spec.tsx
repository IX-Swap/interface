import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { compactColumns } from 'app/pages/accounts/pages/banks/pages/BanksList/columns'
import { banksQueryKeys } from 'config/queryKeys'
import React from 'react'
import { render } from 'test-utils'
import { bank } from '__fixtures__/authorizer'
import { user } from '__fixtures__/user'
import { CompactTable } from '../CompactTable'

describe('CompactTable', () => {
  const props = {
    columns: compactColumns,
    items: [bank],
    loading: false,
    hasActions: false,
    cacheQueryKey: banksQueryKeys.getListByUserId(user._id)
  }

  it('compact table matches snapshot', () => {
    const { container } = render(
      <ActiveElementContextWrapper>
        <CompactTable {...props} menu={<></>} />
      </ActiveElementContextWrapper>
    )
    expect(container).toMatchSnapshot()
  })
})
