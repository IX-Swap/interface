import React from 'react'
import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import {
  WalletAddress,
  WalletAddressProps
} from 'v2/app/components/WalletAddress'
import { copyToClipboard } from 'v2/helpers/clipboard'

jest.mock('v2/helpers/clipboard', () => ({ copyToClipboard: jest.fn() }))

describe('WalletAddress', () => {
  const props: WalletAddressProps = {
    val: '1234567890'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WalletAddress {...props} />)
  })

  it('renders truncated value', () => {
    const { container } = render(<WalletAddress {...props} />)

    expect(container).toHaveTextContent('1234...7890')
  })

  it('copies input value to clipboard', async () => {
    const { getByRole } = render(<WalletAddress {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(copyToClipboard).toHaveBeenCalledTimes(1)
      expect(copyToClipboard).toHaveBeenCalledWith(props.val)
    })
  })
})
