import React from 'react'
import { render } from 'test-utils'
import { DSTableActions } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTableActions'
import { balance } from '__fixtures__/balance'
import { DSRoute } from '../../router/config'

describe('DSTableActions', () => {
  const props = { item: balance }

  it('renders view, deposit & withdraw links', async () => {
    const { getByText } = render(<DSTableActions {...props} />)

    const withdrawLink = getByText('Withdraw')
    const depositLink = getByText('Deposit')

    expect(withdrawLink).toBeInstanceOf(HTMLAnchorElement)
    expect(withdrawLink).toHaveProperty(
      'href',
      `http://localhost${DSRoute.withdraw}`
    )

    expect(depositLink).toBeInstanceOf(HTMLAnchorElement)
    expect(depositLink).toHaveProperty(
      'href',
      `http://localhost${DSRoute.deposit}`
    )
  })
})
