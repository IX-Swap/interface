import Grid from '@mui/material/Grid'
import React from 'react'
import { FakeOpenOrdersContextWrapper, render } from 'test-utils'
import { Hidden } from '@mui/material'
import * as useStyles from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileNestedOrders.styles'

import {
  OpenOrdersContext,
  OpenOrdersContextWrapper
} from 'app/pages/invest/components/Trading/context/OpenOrdersContextWrapper'
import { MobileNestedOrders } from '../MobileNestedOrders'
import { orders } from '__fixtures__/otcOrders'

jest.mock('@mui/material/Hidden', () => jest.fn(({ children }) => children))
jest.mock(
  'app/pages/invest/components/Trading/Orders/OpenOrders/MobileConfirmationMessage',
  () => ({
    MobileConfirmationMessage: jest.fn()
  })
)
jest.mock(
  'app/pages/invest/components/Trading/Orders/OpenOrders/MobileConfirmationMessage',
  () => ({
    ConfirmOTCOrderActions: jest.fn()
  })
)
jest.mock(
  'app/pages/invest/components/Trading/Orders/OpenOrders/ToggleDetailsButton',
  () => ({
    ToggleDetailsButton: jest.fn()
  })
)
describe('MobileConfirmationMessage', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })
  const styles = {
    separator: 'a',
    drawer: 'b',
    close: 'c',
    header: 'd',
    rowBox: 'e',
    tableHeader: 'f',
    dataCell: 'e'
  }
  it('renders empty state correctly for account state', () => {
    jest.spyOn(useStyles, 'useStyles').mockReturnValueOnce(styles as any)
    render(
      <FakeOpenOrdersContextWrapper
        context={{
          isIndexOpen: () => true,
          toggleRow: () => undefined,
          hasOpenIndices: true,
          openIndex: '609d1d93c54af74af46c027c'
        }}
      >
        <MobileNestedOrders items={orders} />
      </FakeOpenOrdersContextWrapper>
    )

    expect(Hidden).toHaveBeenCalledTimes(1)
  })
})
