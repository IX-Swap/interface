import React from 'react'
import { render, cleanup } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/react'
import {
  IdentityDialog,
  IdentityDialogProps
} from 'v2/app/pages/identity/components/IdentityDialog'

describe('IdentityDialog', () => {
  const props: IdentityDialogProps = {
    closeFn: jest.fn(),
    isOpen: true
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IdentityDialog {...props} />)
  })

  it('renders nothing if isOpen is false', async () => {
    const { container } = render(<IdentityDialog {...props} isOpen={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('invokes closeFn on (Skip for now) button click', async () => {
    const { getByRole } = render(<IdentityDialog {...props} />)

    const button = getByRole('button')
    fireEvent.click(button)
    await waitFor(() => {
      expect(button.textContent).toEqual('Skip for now')
      expect(props.closeFn).toHaveBeenCalledTimes(1)
    })
  })
})
