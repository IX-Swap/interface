import { OpenOrdersContextWrapper } from 'app/pages/invest/components/Trading/context/OpenOrdersContextWrapper'
import { DropDownOTCRow } from 'app/pages/invest/components/Trading/Orders/OpenOrders/DropDownOTCRow'
import React from 'react'
import { render } from 'test-utils'
import { order1Open } from '__fixtures__/otcOrders'

describe('Dropdown otc row', () => {
  it('renders dropdown correctly', () => {
    const { container } = render(
      <OpenOrdersContextWrapper>
        <DropDownOTCRow order={order1Open} />
      </OpenOrdersContextWrapper>
    )
    expect(container).toMatchSnapshot()
  })
})
