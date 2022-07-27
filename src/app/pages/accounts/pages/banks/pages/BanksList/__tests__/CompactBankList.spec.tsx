import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { compactColumns } from 'app/pages/accounts/pages/banks/pages/BanksList/columns'
import { CompactBankList } from 'app/pages/accounts/pages/banks/pages/BanksList/CompactBankList'
import { banksQueryKeys } from 'config/queryKeys'
import React from 'react'
import { render } from 'test-utils'
import { bank } from '__fixtures__/authorizer'
import { user } from '__fixtures__/user'

jest.mock('app/pages/accounts/pages/banks/pages/BanksList/MobileMenu', () => ({
  MobileMenu: jest.fn(() => null)
}))

describe('CompactBankList', () => {
  const props = {
    columns: compactColumns,
    items: [bank],
    loading: false,
    hasActions: false,
    cacheQueryKey: banksQueryKeys.getListByUserId(user._id)
  }

  it('compact bank list matches snapshot', () => {
    const { container } = render(
      <ActiveElementContextWrapper>
        <CompactBankList {...props} />
      </ActiveElementContextWrapper>
    )
    expect(container).toMatchSnapshot()
  })
})
