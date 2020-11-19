import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawalAddressCreate } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WithdrawalAddressCreate'
import { WADialog } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialog'
import { WADialogTitle } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogTitle'
import { WADialogContent } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogContent'
import { WAFormWrapper } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormWrapper'

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
  'v2/app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormWrapper',
  () => ({ WAFormWrapper: jest.fn(() => null) })
)

describe('WithdrawalAddressCreate', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WithdrawalAddressCreate isOpen />)
  })

  it('renders WADialog with correct props', () => {
    render(<WithdrawalAddressCreate isOpen />)

    expect(WADialog).toHaveBeenCalledTimes(1)
    expect(WADialog).toHaveBeenCalledWith(
      { open: true, children: expect.anything() },
      {}
    )
  })

  it('renders WADialogTitle with correct props', () => {
    render(<WithdrawalAddressCreate isOpen />)

    expect(WADialogTitle).toHaveBeenCalledTimes(1)
    expect(WADialogTitle).toHaveBeenCalledWith(
      { label: 'Add Withdrawal Address' },
      {}
    )
  })

  it('renders WADialogContent with correct props', () => {
    render(<WithdrawalAddressCreate isOpen />)

    expect(WADialogContent).toHaveBeenCalledTimes(1)
    expect(WADialogContent).toHaveBeenCalledWith(
      { children: expect.anything() },
      {}
    )
  })

  it('renders WAFormWrapper with correct props', () => {
    render(<WithdrawalAddressCreate isOpen />)

    expect(WAFormWrapper).toHaveBeenCalledTimes(1)
  })
})
