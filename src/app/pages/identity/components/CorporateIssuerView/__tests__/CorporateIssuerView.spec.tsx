import { CorporateIssuerView } from 'app/pages/identity/components/CorporateIssuerView/CorporateIssuerView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { corporate } from '__fixtures__/identity'
import { history } from 'config/history'
import { user } from '__fixtures__/user'

window.URL.revokeObjectURL = jest.fn()

describe('CorporateIssuerView', () => {
  beforeEach(() => {
    history.push(
      `/app/identity/corporateIdentity/${user._id}/${corporate._id}/view`
    )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CorporateIssuerView data={corporate} />)
  })
})
