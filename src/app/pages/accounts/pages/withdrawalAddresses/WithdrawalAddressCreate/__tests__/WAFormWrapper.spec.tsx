import userEvent from '@testing-library/user-event'
import MockAdapter from 'axios-mock-adapter'
import { accountsURL, blockchainNetworksURL } from 'config/apiURL'
import { act } from 'react-dom/test-utils'
import web3Service from 'services/web3'
import { render, snackbarServiceMock, waitFor, within } from 'test-utils'
import { networks } from '__fixtures__/network'
import { WAFormWrapper } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAFormWrapper'
import { user } from '__fixtures__/user'
import * as useAuth from 'hooks/auth/useAuth'
import { BlockchainWallet } from 'components/form/WalletSelect'

/* eslint-disable import/first */
jest.deepUnmock('axios')
import { _axios } from 'services/api'

jest.spyOn(useAuth, 'useAuth').mockReturnValue({ user, isAuthenticated: true })

const getAccountSpy = jest.spyOn(web3Service, 'getAccount')
const signWalletSpy = jest.spyOn(web3Service, 'signWallet')

const mock = new MockAdapter(_axios)
const network = networks[0]
const walletLabel = 'My Metamask Wallet'
const walletAddress = '5cc2c1a506a7b202ecb157de5383c084'
const walletHash = '02b7bd615871b79ec9d9d5e75bc70f56'
const signedHash = '4de01fc6170f8eaa9af35752a31dd989'

describe('WAFormWrapper', () => {
  beforeEach(() => {
    mock.onGet(accountsURL.withdrawalAddresses.getAllNetworks).reply(200, {
      data: networks,
      message: 'OK'
    })

    mock
      .onPost(blockchainNetworksURL.generateWalletHash, {
        walletAddress
      })
      .reply(200, {
        data: walletHash
      })

    mock
      .onPost(blockchainNetworksURL.verifyWalletOwnership, {
        walletAddress,
        signedHash
      })
      .reply(200, {
        data: {
          isVerified: true
        }
      })

    mock
      .onPost(accountsURL.withdrawalAddresses.create(user._id), {
        address: walletAddress,
        label: walletLabel,
        wallet: BlockchainWallet.Metamask,
        network: network._id
      })
      .reply(200, {})
  })

  it('should work', async () => {
    const { getByTestId, getByRole, getByText, getByLabelText, container } =
      render(<WAFormWrapper />, { mockAPI: false })

    // select connect option
    userEvent.click(getByText('Connect to Wallet'))

    // open networks dropdown
    const networkSelect = getByTestId('network-select')
    userEvent.click(within(networkSelect).getByRole('button'))

    // select first network
    const networksDropdown = getByRole('listbox')
    const ropstenNetwork = await waitFor(() =>
      within(networksDropdown).getByText(network.name)
    )
    userEvent.click(ropstenNetwork)

    // select wallet
    const walletSelect = getByTestId('wallet-select')
    userEvent.click(within(walletSelect).getByRole('button'))

    // select first network
    const walletsDropdown = getByRole('listbox')
    userEvent.click(within(walletsDropdown).getByText('Metamask'))

    // click connect wallet
    getAccountSpy.mockResolvedValueOnce(walletAddress)
    userEvent.click(getByText('Connect Wallet'))

    // check for form values
    await waitFor(() =>
      expect(getByTestId('blockchain-address-form')).toHaveFormValues({
        variant: 'connect',
        network: network._id,
        address: walletAddress
      })
    )

    // click sign challenge
    signWalletSpy.mockResolvedValueOnce(signedHash)
    await act(async () => {
      userEvent.click(getByText('Sign Challenge'))
    })

    // fill in address label
    userEvent.type(getByLabelText('Address Label'), walletLabel)

    // agree to the terms
    userEvent.click(getByRole('checkbox'))

    // check for form values
    await waitFor(() =>
      expect(getByTestId('blockchain-address-form')).toHaveFormValues({
        variant: 'connect',
        network: network._id,
        address: walletAddress,
        wallet: BlockchainWallet.Metamask,
        agree: true,
        label: walletLabel
      })
    )

    // record form snapshot
    expect(container).toMatchSnapshot()

    const submitButton = await waitFor(() => getByText('Submit'))
    userEvent.click(submitButton)

    await waitFor(() => {
      expect(snackbarServiceMock.showSnackbar).toBeCalledWith(
        'Success',
        'success'
      )
    })
  })
})
