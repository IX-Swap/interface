import React from 'react'
import { render } from 'test-utils'
import {
  Actions,
  ActionsProps
} from 'app/components/TwoFADialog/Actions/Actions'
import { fireEvent, waitFor } from '@testing-library/dom'
import { history } from 'config/history'
import { SecurityRoute } from 'app/pages/security/router/config'

describe('Actions', () => {
  const props: ActionsProps = {
    enable2fa: undefined,
    handleClose: jest.fn()
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correct content with correct props when enable2fa is undefined', () => {
    const { getByTestId } = render(<Actions {...props} />)

    expect(getByTestId('first-button')).toBeInTheDocument()
    expect(getByTestId('second-button')).toBeInTheDocument()
    expect(getByTestId('second-button')).toHaveTextContent('Later')
  })

  it('renders correct content with correct props when enable2fa is false', () => {
    const { getByTestId } = render(
      <Actions {...{ ...props, enable2fa: false }} />
    )

    expect(getByTestId('first-button')).toBeInTheDocument()
    expect(getByTestId('second-button')).toBeInTheDocument()
    expect(getByTestId('second-button')).toHaveTextContent('Later')
  })

  it('renders correct content with correct props when enable2fa is true', () => {
    const { container, getByTestId } = render(
      <Actions {...{ ...props, enable2fa: true }} />
    )

    expect(container).not.toHaveTextContent('Enabled 2FA')
    expect(getByTestId('second-button')).toBeInTheDocument()
    expect(getByTestId('second-button')).toHaveTextContent('Update 2FA')
  })

  it('invokes handleClose and history push functions on first button click', async () => {
    const { getByTestId } = render(<Actions {...props} />)
    fireEvent.click(getByTestId('first-button'))
    await waitFor(() => {
      expect(history.location.pathname).toEqual(SecurityRoute.setup2fa)
      expect(props.handleClose).toBeCalled()
    })
  })

  it('invokes handleClose and history push functions on second button click when enable2fa is true', async () => {
    const { getByTestId } = render(
      <Actions {...{ ...props, enable2fa: true }} />
    )
    fireEvent.click(getByTestId('second-button'))
    await waitFor(() => {
      expect(history.location.pathname).toEqual(SecurityRoute.change2fa)
      expect(props.handleClose).toBeCalled()
    })
  })
})
