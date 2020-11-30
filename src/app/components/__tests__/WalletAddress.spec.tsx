import React from 'react'
import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import {
  WalletAddress,
  WalletAddressProps
} from 'app/components/WalletAddress'
import { copyToClipboard } from 'helpers/clipboard'
import { AppRouterLink } from 'components/AppRouterLink'

jest.mock('helpers/clipboard', () => ({ copyToClipboard: jest.fn() }))
jest.mock('components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('WalletAddress', () => {
  const props: WalletAddressProps = {
    address: '1234567890'
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

  it('renders AppRouterLink if link is true', () => {
    render(<WalletAddress {...props} link />)

    expect(AppRouterLink).toHaveBeenCalledTimes(1)
  })

  it('copies input value to clipboard', async () => {
    const { getByRole } = render(<WalletAddress {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(copyToClipboard).toHaveBeenCalledTimes(1)
      expect(copyToClipboard).toHaveBeenCalledWith(props.address)
    })
  })
})
