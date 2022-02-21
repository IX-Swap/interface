import React from 'react'
import { render } from 'test-utils'
import { Enabled } from 'app/pages/security/pages/update2fa/components/Enabled/Enabled'
import { fireEvent, waitFor } from '@testing-library/dom'
import { history } from 'config/history'
import { SecurityRoute } from 'app/pages/security/router/config'

describe('Enabled', () => {
  it('should match snapshot, invokes history push on button click', async () => {
    const { container, getByText } = render(<Enabled />)
    const button = getByText(/ok/i)

    expect(container).toMatchSnapshot()

    fireEvent.click(button)
    await waitFor(() => {
      expect(history.location.pathname).toEqual(SecurityRoute.landing)
    })
  })
})
