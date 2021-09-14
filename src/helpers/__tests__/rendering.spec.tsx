import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  wysiwygToHtml,
  renderAddressColumn,
  renderDistributionStatus,
  renderDateAndTimeField
} from 'helpers/rendering'
import { WalletAddress } from 'app/components/WalletAddress'
import { withdrawalAddress } from '__fixtures__/withdrawalAddress'
import { formatDateToMMDDYY, formatTime } from 'helpers/dates'

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

describe('renderDistributionStatus', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<>{renderDistributionStatus('approved')}</>)
  })
})

describe('renderDateAndTimeField', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('returns wallet address', () => {
    const testDate = '2021-08-21T00:27:12.339Z'
    const { getByTestId } = render(<>{renderDateAndTimeField(testDate)}</>)
    const date = getByTestId('date')
    const time = getByTestId('time')
    expect(date).toHaveTextContent(formatDateToMMDDYY(testDate))
    expect(time).toHaveTextContent(formatTime(testDate))
  })
})
