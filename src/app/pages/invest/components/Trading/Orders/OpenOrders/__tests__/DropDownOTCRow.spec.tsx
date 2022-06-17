import React from 'react'
import { render } from 'test-utils'
import { DropDownOTCRow } from 'app/pages/invest/components/Trading/Orders/OpenOrders/DropDownOTCRow'
import { order1 } from '__fixtures__/otcOrders'
import { OpenOrdersContextWrapper } from 'app/pages/invest/components/Trading/context/OpenOrdersContextWrapper'

describe('Dropdown otc row', () => {
  it('renders dropdown correctly', () => {
    const { container } = render(
      <OpenOrdersContextWrapper>
        <DropDownOTCRow order={order1} />
      </OpenOrdersContextWrapper>
    )
    expect(container).toMatchSnapshot()
  })
})
