import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawalAddressView } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WithdrawalAddressView'
import { WADialog } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialog'
import { WADialogTitle } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogTitle'
import { WADialogContent } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WADialog/WADialogContent'

jest.mock(
  'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialog',
  () => ({ WADialog: jest.fn(({ children }) => children) })
)
jest.mock(
  'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogTitle',
  () => ({ WADialogTitle: jest.fn(() => null) })
)
jest.mock(
  'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogContent',
  () => ({ WADialogContent: jest.fn(({ children }) => children) })
)
jest.mock(
  'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogActions',
  () => ({ WADialogActions: jest.fn(({ children }) => children) })
)
jest.mock(
  'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WAViewContent',
  () => ({ WAViewContent: jest.fn(() => null) })
)

describe('WithdrawalAddressView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalAddressView />)
  })

  it('renders WADialog with correct props', () => {
    render(<WithdrawalAddressView />)

    expect(WADialog).toHaveBeenCalled()
    expect(WADialog).toHaveBeenCalledWith(
      { open: true, children: expect.anything() },
      {}
    )
  })

  it('renders WADialogTitle with correct props', () => {
    render(<WithdrawalAddressView />)

    expect(WADialogTitle).toHaveBeenCalled()
    expect(WADialogTitle).toHaveBeenCalledWith(
      { label: 'View Withdrawal Address' },
      {}
    )
  })

  it('renders WADialogContent with correct props', () => {
    render(<WithdrawalAddressView />)

    expect(WADialogContent).toHaveBeenCalled()
    expect(WADialogContent).toHaveBeenCalledWith(
      { children: expect.anything() },
      {}
    )
  })

  it('renders WADialogActions with correct props', () => {
    render(<WithdrawalAddressView />)

    expect(WADialogActions).toHaveBeenCalled()
    expect(WADialogActions).toHaveBeenCalledWith(
      { children: expect.anything() },
      {}
    )
  })
})
function WADialogActions(WADialogActions: any) {
  throw new Error('Function not implemented.')
}
