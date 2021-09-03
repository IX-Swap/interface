import { IssuanceRouter } from 'app/pages/issuance/router/IssuanceRouter'
import * as useIsIssuer from 'helpers/acl'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('IssuanceRouter', () => {
  beforeEach(() => {
    jest.spyOn(useIsIssuer, 'useIsIssuer').mockImplementation(() => true as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IssuanceRouter />)
  })
})
