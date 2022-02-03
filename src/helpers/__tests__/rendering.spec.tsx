import React from 'react'
import { render } from 'test-utils'
import {
  wysiwygToHtml,
  renderAddressColumn,
  renderDateAndTimeField,
  renderPartOfEmail
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
    jest.clearAllMocks()
  })

  it('returns wallet address', () => {
    render(<>{renderAddressColumn(withdrawalAddress.address)}</>)
    expect(WalletAddress).toHaveBeenCalled()
  })
})

describe('renderDateAndTimeField', () => {
  afterEach(async () => {
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

describe('renderPartOfEmail', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('returns empty string when email is undefined', () => {
    const testEmail = undefined
    expect(renderPartOfEmail(testEmail)).toEqual('')
  })

  it('returns empty string when email is empty string', () => {
    const testEmail = ''
    expect(renderPartOfEmail(testEmail)).toEqual('')
  })

  it('returns correct part of email address', () => {
    const testEmail = 'test@gmail.com'
    expect(renderPartOfEmail(testEmail)).toEqual('tes***@gmail.com')
  })
})
