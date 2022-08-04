import { render } from '@testing-library/react'
import { ActiveElementContext } from 'app/context/ActiveElementContextWrapper'
import * as useStyles from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileNestedOrders.styles'
import React from 'react'

import { MobileNestedOrders } from 'app/pages/invest/components/Trading/Orders/OpenOrders/MobileNestedOrders'
import { LeavePageContext } from 'app/pages/issuance/context/LeavePageContext'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { orders } from '__fixtures__/otcOrders'

jest.mock(
  'app/pages/invest/components/Trading/Orders/OpenOrders/MobileConfirmationMessage',
  () => ({
    MobileConfirmationMessage: jest.fn(() => null)
  })
)
jest.mock(
  'app/pages/invest/components/Trading/Orders/OpenOrders/OTCOrderActions',
  () => ({
    ConfirmOTCOrderActions: jest.fn(() => null)
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
      isTablet: true
    } as any)
    const { getByTestId } = render(
      <LeavePageContext.Provider
        value={{
          openPrompt: () => undefined,
          closePrompt: () => undefined,
          openCongested: () => undefined,
          showCongested: false,
          hideCongested: () => undefined,
          showPrompt: false
        }}
      >
        <ActiveElementContext.Provider
          value={{
            isIndexOpen: () => true,
            toggleRow: () => undefined,
            hasOpenIndices: true,
            openIndex: '609d1d93c54af74af46c027c'
          }}
        >
          <MobileNestedOrders items={orders} />
        </ActiveElementContext.Provider>
      </LeavePageContext.Provider>
    )
    expect(getByTestId('matches-nested-mobile')).toBeDefined()
  })
})
