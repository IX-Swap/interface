import React from 'react'
import { render } from 'test-utils'
import { RecentTransactionsTable } from '../RecentTransactionsTable'

describe('TransactionStatus', () => {
  it('status corresponds with snapshot', () => {
    const { container } = render(<RecentTransactionsTable />)

    expect(container).toMatchSnapshot()
  })
})
