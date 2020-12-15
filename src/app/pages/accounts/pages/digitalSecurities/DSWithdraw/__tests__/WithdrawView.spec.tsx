import React from 'react'
import { cleanup, renderWithDepositStore } from 'test-utils'
import { WithdrawView } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawView'
import { AssetInfo } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo'
import { Preview } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview'
import { Setup } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup'
import { SuccessView } from 'app/pages/accounts/pages/banks/components/SuccessView'
import { ResetButton } from 'app/pages/accounts/pages/banks/components/ResetButton'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSDeposit/AssetInfo',
  () => ({ AssetInfo: jest.fn(() => null) })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview',
  () => ({ Preview: jest.fn(() => null) })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Setup',
  () => ({ Setup: jest.fn(() => null) })
)

jest.mock('app/pages/accounts/pages/banks/components/SuccessView', () => ({
  SuccessView: jest.fn(() => null)
}))

jest.mock('app/pages/accounts/pages/banks/components/ResetButton', () => ({
  ResetButton: jest.fn(() => null)
}))

describe('WithdrawView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    renderWithDepositStore(<WithdrawView />, { isPreview: true })
  })

  it('renders correct components on the SETUP step', () => {
    renderWithDepositStore(<WithdrawView />, { isSetup: true })

    expect(AssetInfo).toBeCalled()
    expect(Setup).toBeCalled()
    expect(Preview).not.toBeCalled()
    expect(SuccessView).not.toBeCalled()
    expect(ResetButton).not.toBeCalled()
  })

  it('renders correct components on the PREVIEW step', () => {
    renderWithDepositStore(<WithdrawView />, { isPreview: true })

    expect(AssetInfo).toBeCalled()
    expect(Setup).toBeCalled()
    expect(Preview).toBeCalled()
    expect(SuccessView).not.toBeCalled()
    expect(ResetButton).not.toBeCalled()
  })

  it('renders correct components on the SUCCESS step', () => {
    renderWithDepositStore(<WithdrawView />, { isSuccess: true })

    expect(AssetInfo).not.toBeCalled()
    expect(Setup).not.toBeCalled()
    expect(Preview).not.toBeCalled()
    expect(SuccessView).toBeCalled()
    expect(ResetButton).toBeCalled()
  })
})
