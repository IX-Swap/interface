import { ActionsProps } from 'app/pages/accounts/pages/cash/components/Actions'
import { CashStatus } from 'app/pages/accounts/pages/cash/components/CashStatus'
import React from 'react'
import { render } from 'test-utils'
import { cashBalanceSubmitted } from '__fixtures__/balance'

describe('CashStatus', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('matches snapshot', async () => {
    const props: ActionsProps = {
      item: cashBalanceSubmitted
    }
    const { container } = render(<CashStatus {...props} />)

    expect(container).toMatchSnapshot()
  })
})
