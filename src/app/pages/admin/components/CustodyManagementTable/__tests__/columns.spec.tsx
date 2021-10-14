import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  renderWalletAddress,
  renderCustodianName
} from 'app/pages/admin/components/CustodyManagementTable/columns'
import { custodyManagementItems } from '__fixtures__/custodyAccount'
import { WalletAddressField } from 'app/pages/admin/components/CustodyManagementTable/WalletAddressField'

jest.mock(
  'app/pages/admin/components/CustodyManagementTable/WalletAddressField',
  () => ({
    WalletAddressField: jest.fn(() => null)
  })
)

describe('renderWalletAddress', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns wallet address field component', () => {
    render(<>{renderWalletAddress(custodyManagementItems[0].walletAddress)}</>)
    expect(WalletAddressField).toHaveBeenCalledTimes(1)
    expect(WalletAddressField).toHaveBeenCalledWith(
      expect.objectContaining({
        address: custodyManagementItems[0].walletAddress
      }),
      {}
    )
  })

  it('returns "-" when address is empty string', () => {
    expect(renderWalletAddress('')).toEqual('-')
  })

  it('returns "-" when address is null', () => {
    expect(renderWalletAddress(null as any)).toEqual('-')
  })

  it('returns "InvestaX" when type is "INVESTAX"', () => {
    expect(renderCustodianName('INVESTAX')).toEqual('InvestaX')
  })

  it('returns "HEX" when type is "HEX"', () => {
    expect(renderCustodianName('HEX')).toEqual('HEX')
  })
})
