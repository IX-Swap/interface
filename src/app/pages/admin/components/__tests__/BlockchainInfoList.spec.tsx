import React from 'react'
import { blockchainSettings } from '__fixtures__/blockchain'
import { render } from 'test-utils'
import { BlockchainInfoList } from 'app/pages/admin/components/BlockchainInfo/BlockchainInfoList'
import { BlockchainInfo } from 'app/pages/admin/components/BlockchainInfo/BlockchainInfo'

jest.mock('app/pages/admin/components/BlockchainInfo/BlockchainInfo', () => ({
  BlockchainInfo: jest.fn().mockReturnValue(null)
}))

describe('BlockchainInfoList', () => {
  it('should render BlockchainInfo component for each network', () => {
    render(<BlockchainInfoList networks={blockchainSettings.networks} />)

    expect(BlockchainInfo).toBeCalledTimes(blockchainSettings.networks.length)

    blockchainSettings.networks.forEach((network, index) => {
      expect(BlockchainInfo).toHaveBeenNthCalledWith(index + 1, { network }, {})
    })
  })
})
