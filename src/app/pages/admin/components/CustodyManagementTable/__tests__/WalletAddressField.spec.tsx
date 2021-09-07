import React from 'react'
import { render, cleanup } from 'test-utils'
import { WalletAddressField } from 'app/pages/admin/components/CustodyManagementTable/WalletAddressField'
import { custodyManagementItems } from '__fixtures__/custodyAccount'
import * as useServices from 'hooks/useServices'
import { fireEvent, waitFor } from '@testing-library/dom'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => null)
}))

describe('WalletAddressField', () => {
  const showSnackbarFn = jest.fn()
  const useSnackbarServiceResponse = {
    snackbarService: { showSnackbar: showSnackbarFn }
  }

  beforeEach(() => {
    jest
      .spyOn(useServices, 'useServices')
      .mockImplementation(() => useSnackbarServiceResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <WalletAddressField address={custodyManagementItems[0].walletAddress} />
    )
  })

  it('invokes showSnackbar function on button click', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {}
      }
    })
    jest.spyOn(navigator.clipboard, 'writeText')

    const { getByRole } = render(
      <WalletAddressField address={custodyManagementItems[0].walletAddress} />
    )
    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(showSnackbarFn).toHaveBeenCalled()
      expect(showSnackbarFn).toHaveBeenCalledWith(`Copied!`, 'success')
    })
  })
})
