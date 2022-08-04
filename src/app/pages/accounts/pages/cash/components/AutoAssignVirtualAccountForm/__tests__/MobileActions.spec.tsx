import { ActionsProps } from 'app/pages/accounts/pages/cash/components/Actions'
import { MobileActions } from 'app/pages/accounts/pages/cash/components/MobileActions'
import { NewAction } from 'app/pages/authorizer/components/NewAction'
import React from 'react'
import { render } from 'test-utils'
import { cashBalance } from '__fixtures__/balance'

jest.mock('app/pages/authorizer/components/NewAction', () => ({
  NewAction: jest.fn(() => null)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}))

describe('MobileActions', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Renders New Actions correctly', async () => {
    const props: ActionsProps = {
      item: cashBalance
    }
    render(<MobileActions {...props} />)
    expect(NewAction).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Deposit'
      }),
      {}
    )
    expect(NewAction).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Withdraw',
        disabled: false
      }),
      {}
    )
  })
})
