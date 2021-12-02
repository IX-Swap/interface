import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  createRow,
  headCells,
  TradesTable
} from 'app/pages/accounts/pages/reports/components/TradesTable/TradesTable'
import { fakeTradeItem } from '__fixtures__/reports'
import { TradesRow } from 'app/pages/accounts/pages/reports/components/TradesTable/TradesRow'

jest.mock(
  'app/pages/accounts/pages/reports/components/TradesTable/TradesRow',
  () => ({
    TradesRow: jest.fn(() => null)
  })
)

describe('TradesTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders all head cells in table with correct text content', () => {
    const { getAllByTestId } = render(<TradesTable data={[fakeTradeItem]} />)

    headCells.forEach(({ label, align }, i) =>
      expect(getAllByTestId('cell')[i]).toHaveTextContent(label)
    )
  })

  it('renders all row components in table body with correct text content', () => {
    const fakeRow = createRow('Securities Pair')

    render(<TradesTable data={[fakeTradeItem]} />)

    expect(TradesRow).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        index: 0,
        row: fakeRow
      }),
      {}
    )

    expect(TradesRow).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        row: fakeTradeItem,
        index: 1
      }),
      {}
    )
  })
})
