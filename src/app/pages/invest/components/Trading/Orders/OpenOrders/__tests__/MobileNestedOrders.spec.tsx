import * as useStyles from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileNestedOrders.styles'
import React from 'react'
import { render } from '@testing-library/react'
import { OpenOrdersContext } from 'app/pages/invest/components/Trading/context/OpenOrdersContextWrapper'
import { orders } from '__fixtures__/otcOrders'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { MobileNestedOrders } from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileNestedOrders'

jest.mock(
  'app/pages/invest/components/Trading/Orders/OpenOrders/MobileConfirmationMessage',
  () => ({
    MobileConfirmationMessage: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/invest/components/Trading/Orders/OpenOrders/MobileConfirmationMessage',
  () => ({
    MobileConfirmationMessage: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/invest/components/Trading/Orders/OpenOrders/ToggleDetailsButton',
  () => ({
    ToggleDetailsButton: jest.fn(() => null)
  })
)

describe('MobileNestedOrders', () => {
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
  it('Renders mobile nested orders correctly when we have a list of matches', () => {
    jest.spyOn(useStyles, 'useStyles').mockReturnValueOnce(styles as any)
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValue({
      isDesktop: false
    } as any)
    const { getByTestId } = render(
      <OpenOrdersContext.Provider
        value={{
          isIndexOpen: () => true,
          toggleRow: () => undefined,
          hasOpenIndices: true,
          openIndex: '609d1d93c54af74af46c027c'
        }}
      >
        <MobileNestedOrders items={orders} />
      </OpenOrdersContext.Provider>
    )
    expect(getByTestId('matches-nested-mobile')).toBeDefined()
  })
})
