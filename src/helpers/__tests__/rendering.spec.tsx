import React from 'react'
import { render, cleanup } from 'test-utils'
import { wysiwygToHtml, renderAddressColumn } from 'helpers/rendering'
import { WalletAddress } from 'app/components/WalletAddress'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'

jest.mock('app/components/WalletAddress', () => ({
  WalletAddress: jest.fn(() => null)
}))

describe('wysiwygToHtml', () => {
  const draftString = JSON.stringify({
    blocks: [{ text: 'Foo', type: 'unstyled', entityRanges: [] }],
    entityMap: {}
  })

  it('returns html string', () => {
    expect(wysiwygToHtml(draftString)).toEqual(`<p>Foo</p>\n`)
  })
})

describe('renderAddressColumn', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns wallet address', () => {
    render(<>{renderAddressColumn(withdrawalAddress.address)}</>)
    expect(WalletAddress).toHaveBeenCalled()
  })
})
