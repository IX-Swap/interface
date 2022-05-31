import { BlockchainAddress } from 'app/pages/invest/components/BlockchainWallet/BlockchainAddress'
import React from 'react'
import { render } from 'test-utils'

describe('BlockchainAddress', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { container } = render(
      <BlockchainAddress
        account={'0x67ed490d810c41263758e7355cef720ffed68cbc'}
        chainId={1}
        labelName='wallet'
      />
    )
    expect(container).toMatchSnapshot()
  })
})
