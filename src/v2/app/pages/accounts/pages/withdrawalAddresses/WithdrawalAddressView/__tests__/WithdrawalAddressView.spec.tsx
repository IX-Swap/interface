import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawalAddressView } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WithdrawalAddressView'
import { WADialog } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialog'
import { WADialogTitle } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogTitle'
import { WADialogContent } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogContent'
import { WADialogActions } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogActions'
import { WAViewContent } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WAViewContent'

jest.mock(
  'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialog',
  () => ({ WADialog: jest.fn(({ children }) => children) })
)
jest.mock(
  'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogTitle',
  () => ({ WADialogTitle: jest.fn(() => null) })
)
jest.mock(
  'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogContent',
  () => ({ WADialogContent: jest.fn(({ children }) => children) })
)
jest.mock(
  'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogActions',
  () => ({ WADialogActions: jest.fn(({ children }) => children) })
)
jest.mock(
  'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressView/WAViewContent',
  () => ({ WAViewContent: jest.fn(() => null) })
)

describe('WithdrawalAddressView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalAddressView isOpen />)
  })

  it('renders WADialog with correct props', () => {
    render(<WithdrawalAddressView isOpen />)

    expect(WADialog).toHaveBeenCalled()
    expect(WADialog).toHaveBeenCalledWith(
      { open: true, children: expect.anything() },
      {}
    )
  })

  it('renders WADialogTitle with correct props', () => {
    render(<WithdrawalAddressView isOpen />)

    expect(WADialogTitle).toHaveBeenCalled()
    expect(WADialogTitle).toHaveBeenCalledWith(
      { label: 'View Withdrawal Address' },
      {}
    )
  })

  it('renders WADialogContent with correct props', () => {
    render(<WithdrawalAddressView isOpen />)

    expect(WADialogContent).toHaveBeenCalled()
    expect(WADialogContent).toHaveBeenCalledWith(
      { children: expect.anything() },
      {}
    )
  })

  it('renders WADialogActions with correct props', () => {
    render(<WithdrawalAddressView isOpen />)

    expect(WADialogActions).toHaveBeenCalled()
    expect(WADialogActions).toHaveBeenCalledWith(
      { children: expect.anything() },
      {}
    )
  })

  it('renders WAViewContent with correct props', () => {
    render(<WithdrawalAddressView isOpen />)

    expect(WAViewContent).toHaveBeenCalled()
  })
})
