import React from 'react'
import { render } from 'test-utils'
import {
  TwoFaDialog,
  TwoFaDialogProps
} from 'app/pages/security/pages/landing/components/TwoFaDialog'
import { fireEvent, waitFor } from '@testing-library/react'

describe('TwoFaDialog', () => {
  const props: TwoFaDialogProps = {
    closeFn: jest.fn(),
    nextFn: jest.fn(),
    isOpen: true
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing if isOpen is false', async () => {
    const { container } = render(<TwoFaDialog {...props} isOpen={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('invokes nextFn on (Google Authenticator) button click', async () => {
    const { getAllByRole } = render(<TwoFaDialog {...props} />)

    const buttons = getAllByRole('button')
    fireEvent.click(buttons[0])
    await waitFor(() => {
      expect(buttons[0].textContent).toEqual('Google Authenticator')
      expect(props.nextFn).toHaveBeenCalledTimes(1)
    })
  })

  it('invokes closeFn on (Skip for now) button click', async () => {
    const { getAllByRole } = render(<TwoFaDialog {...props} />)

    const buttons = getAllByRole('button')
    fireEvent.click(buttons[1])
    await waitFor(() => {
      expect(buttons[1].textContent).toEqual('Skip for now')
      expect(props.closeFn).toHaveBeenCalledTimes(1)
    })
  })
})
