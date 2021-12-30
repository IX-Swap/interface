import { IssuanceRouter } from 'app/pages/issuance/router/IssuanceRouter'
import * as useIsIssuer from 'helpers/acl'
import React from 'react'
import { render } from 'test-utils'

describe('IssuanceRouter', () => {
  beforeEach(() => {
    jest.spyOn(useIsIssuer, 'useIsIssuer').mockImplementation(() => true as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<IssuanceRouter />)
  })
})
