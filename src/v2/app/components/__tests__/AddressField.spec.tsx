import React from 'react'
import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import { AddressField, AddressFieldProps } from 'v2/app/components/AddressField'
import { copyToClipboard } from 'v2/helpers/clipboard'

jest.mock('v2/helpers/clipboard', () => ({ copyToClipboard: jest.fn() }))

describe('AddressField', () => {
  const props: AddressFieldProps = {
    val: '1234567890'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AddressField {...props} />)
  })

  it('renders truncated value', () => {
    const { container } = render(<AddressField {...props} />)

    expect(container).toHaveTextContent('1234...7890')
  })

  it('copies input value to clipboard', async () => {
    const { getByRole } = render(<AddressField {...props} />)

    fireEvent.click(getByRole('button'))

    await waitFor(() => {
      expect(copyToClipboard).toHaveBeenCalledTimes(1)
      expect(copyToClipboard).toHaveBeenCalledWith(props.val)
    })
  })
})
