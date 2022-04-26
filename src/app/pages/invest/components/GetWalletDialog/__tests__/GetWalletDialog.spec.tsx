import React from 'react'
import { render } from 'test-utils'
import * as createCustody from 'app/pages/invest/hooks/useCreateCustodianWallet'
import * as snackbar from 'hooks/useSnackbar'
import {
  GetWalletDialog,
  ModalProps
} from 'app/pages/invest/components/GetWalletDialog/GetWalletDialog'
import { fireEvent, waitFor } from '@testing-library/dom'
import IconButton from '@mui/material/IconButton'

jest.mock('@mui/material/IconButton', () => jest.fn(() => null))

describe('GetWalletDialog', () => {
  const showSnackbar = jest.fn()
  let props: ModalProps
  const createCustodianWallet = jest.fn()
  beforeEach(() => {
    props = {
      open: true,
      toggleOpen: jest.fn()
    }
    jest.spyOn(snackbar, 'useSnackbar').mockReturnValue({ showSnackbar } as any)
    jest
      .spyOn(createCustody, 'useCreateCustodianWallet')
      .mockReturnValue([createCustodianWallet, { isLoading: false }] as any)
  })
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correctly', async () => {
    render(<GetWalletDialog {...props} />)
  })

  it('Invokes callback on button click', async () => {
    const { getByTestId } = render(<GetWalletDialog {...props} />)
    fireEvent.click(getByTestId('getAddressBtn'))
    await waitFor(() => {
      expect(createCustodianWallet).toHaveBeenCalledTimes(1)
    })
  })
})
