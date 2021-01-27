import React from 'react'
import { render, cleanup } from 'test-utils'
import { history } from 'config/history'
import { ViewDSO } from 'app/pages/issuance/pages/ViewDSO'
import { dso } from '__fixtures__/authorizer'
import { IssuanceRoute } from 'app/pages/issuance/router'
import { DSO } from 'app/pages/issuance/components/DSO'

jest.mock('app/pages/issuance/components/DSO', () => ({
  DSO: jest.fn(() => null)
}))

describe('ViewDSO', () => {
  beforeEach(() => {
    history.push(IssuanceRoute.view, { dsoId: dso._id })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<ViewDSO />)
  })

  it('renders DSO with correct props', () => {
    render(<ViewDSO />)

    expect(DSO).toHaveBeenCalledWith(
      { dsoId: dso._id, showAuthorizations: true, showSidebar: true },
      {}
    )
  })
})
