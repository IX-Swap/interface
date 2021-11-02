import React from 'react'
import { BlockchainInfo } from 'app/pages/admin/components/BlockchainInfo/BlockchainInfo'
import { blockchainSettings } from '__fixtures__/blockchain'
import { render } from 'test-utils'

describe('BlockchainInfo', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <BlockchainInfo network={blockchainSettings.networks[1]} />
    )
    expect(container).toMatchSnapshot()
  })

  it('should render network name & symbol', () => {
    const network = blockchainSettings.networks[0]
    const { getByTestId } = render(<BlockchainInfo network={network} />)

    expect(getByTestId('blockchain-network-info-name')).toHaveTextContent(
      `${network.name} (${network.symbol})`
    )
  })

  it('should render default wallet info', () => {
    const network = blockchainSettings.networks[0]
    const { getByTestId } = render(<BlockchainInfo network={network} />)

    expect(getByTestId('blockchain-info-wallet-address')).toHaveTextContent(
      network.walletAddress as string
    )
    expect(getByTestId('blockchain-info-wallet-balance')).toHaveTextContent(
      network.balance
    )
  })

  it('should render owner wallet info', () => {
    const network = blockchainSettings.networks[1]
    const { getByTestId } = render(<BlockchainInfo network={network} />)

    expect(
      getByTestId('blockchain-info-owner-wallet-address')
    ).toHaveTextContent(network.ownerAddress as string)
    expect(
      getByTestId('blockchain-info-owner-wallet-balance')
    ).toHaveTextContent(network.balance)
  })

  it('should render reserve wallet info', () => {
    const network = blockchainSettings.networks[1]
    const { getByTestId } = render(<BlockchainInfo network={network} />)

    expect(
      getByTestId('blockchain-info-reserve-wallet-address')
    ).toHaveTextContent(network.reserveAddress as string)
    expect(
      getByTestId('blockchain-info-reserve-wallet-balance')
    ).toHaveTextContent(network.reserveBalance as string)
  })
})
