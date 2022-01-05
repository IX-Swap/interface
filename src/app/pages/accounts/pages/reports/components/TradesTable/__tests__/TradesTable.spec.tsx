import React from 'react'
import { render } from 'test-utils'
import {
  headCells,
  TradesTable
} from 'app/pages/accounts/pages/reports/components/TradesTable/TradesTable'
import { fakeTradeItem } from '__fixtures__/reports'

describe('TradesTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders all head cells in table with correct text content', () => {
    const { getAllByTestId } = render(<TradesTable data={[fakeTradeItem]} />)

    headCells.forEach(({ label, align }, i) =>
      expect(getAllByTestId('cell')[i]).toHaveTextContent(label)
    )
  })
})
