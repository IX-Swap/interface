import React from 'react'
import { render, cleanup, waitFor } from 'test-utils'
import { RevokeAccess } from 'app/pages/admin/components/RevokeAccess'
import * as useRevokeAccess from 'app/pages/admin/hooks/useRevokeAccess'
import { fireEvent, act } from '@testing-library/react'

jest.mock('app/pages/admin/__tests__/RevokeAccessFields', () => ({
  RevokeAccessFields: jest.fn(() => (
    <input name='sessionId' value='session.id' />
  ))
}))

describe('RevokeAccess', () => {
  const revokeAccessFn = jest.fn()

  beforeEach(() => {
    jest
      .spyOn(useRevokeAccess, 'useRevokeAccess')
      .mockImplementation(() => [revokeAccessFn] as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<RevokeAccess />)
  })

  it('calls revokeAccess fn when form is submitted', async () => {
    await act(async () => {
      const { getByText } = render(<RevokeAccess />)

      await waitFor(() => {
        fireEvent(
          getByText('REVOKE ACCESS TOKEN'),
          new MouseEvent('click', { cancelable: true, bubbles: true })
        )
        expect(revokeAccessFn).toHaveBeenCalled()
      })
    })
  })
})
