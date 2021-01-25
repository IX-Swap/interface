import React from 'react'
import { render, cleanup } from 'test-utils'
import { RevokeAccess } from 'app/pages/admin/components/RevokeAccess'
import * as useRevokeAccess from 'app/pages/admin/hooks/useRevokeAccess'

jest.mock('app/pages/admin/components/RevokeAccessFields', () => ({
  RevokeAccessFields: jest.fn(() => <input name='sessionId' value='' />)
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
})
