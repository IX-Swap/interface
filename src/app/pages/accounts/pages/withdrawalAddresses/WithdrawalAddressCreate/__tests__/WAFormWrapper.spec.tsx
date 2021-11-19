/* eslint-disable import/first */
jest.deepUnmock('axios')

import userEvent from '@testing-library/user-event'
import MockAdapter from 'axios-mock-adapter'
import { accountsURL, blockchainNetworksURL } from 'config/apiURL'
import { act } from 'react-dom/test-utils'
import { _axios } from 'services/api'
import web3Service from 'services/web3'
import { render, waitFor, within } from 'test-utils'
import { networks } from '__fixtures__/network'
import { WAFormWrapper } from '../WAFormWrapper'

const getAccountSpy = jest.spyOn(web3Service, 'getAccount')
const signWalletSpy = jest.spyOn(web3Service, 'signWallet')

const mock = new MockAdapter(_axios)
const network = networks[0]

describe('WAFormWrapper', () => {
  beforeEach(() => {
    mock.onGet(accountsURL.withdrawalAddresses.getAllNetworks).reply(200, {
      data: networks,
      code: 'SUCCESS',
      message: 'OK'
    })

    mock
      .onPost(blockchainNetworksURL.generateWalletHash, {
        walletAddress: 'hello world'
      })
      .reply(200, {
        data: 'dasdadasdasdasdas',
        code: 'SUCCESS',
        message: 'OK'
      })

    mock
      .onPost(blockchainNetworksURL.verifyWalletOwnership, {
        walletAddress: 'hello world',
        signedHash: '1234567890'
      })
      .reply(200, {
        data: {
          isVerified: false
        },
        code: 'SUCCESS',
        message: 'OK'
      })
  })

  it('should work', async () => {
    const { getByTestId, getByRole, getByText } = render(<WAFormWrapper />, {
      mockAPI: false
    })

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

    // click connect wallet
    getAccountSpy.mockResolvedValueOnce('hello world')
    userEvent.click(getByText('Connect Wallet'))

    await waitFor(() =>
      expect(getByTestId('blockchain-address-form')).toHaveFormValues({
        variant: 'connect',
        network: network._id,
        address: 'hello world'
      })
    )

    signWalletSpy.mockResolvedValueOnce('1234567890')

    // click sign challenge
    act(() => {
      userEvent.click(getByText('Sign Challenge'))
    })
  })
})
