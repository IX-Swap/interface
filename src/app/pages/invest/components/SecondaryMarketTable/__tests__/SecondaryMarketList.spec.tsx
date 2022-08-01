import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { exchange as exchangeQueryKeys } from 'config/queryKeys'
import React from 'react'
import { render } from 'test-utils'
import { SecondaryMarketList } from 'app/pages/invest/components/SecondaryMarketTable/SecondaryMarketList'
import { listing } from '__fixtures__/listings'
import { columns } from '../columns'

jest.mock('app/pages/accounts/pages/banks/pages/BanksList/MobileMenu', () => ({
  MobileMenu: jest.fn(() => null)
}))

describe('SecondaryMarketList', () => {
  const props = {
    columns: columns,
    items: [{ name: 'test', latestPrice: 100, listing: listing }],
    loading: false,
    hasActions: false,
    cacheQueryKey: exchangeQueryKeys.marketList
  }

  it('compact bank list matches snapshot', () => {
    const { container } = render(
      <ActiveElementContextWrapper>
        <SecondaryMarketList {...props} />
      </ActiveElementContextWrapper>
    )
    expect(container).toMatchSnapshot()
  })
})
