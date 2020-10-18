/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { history } from 'v2/history'
import { EditDSO } from 'v2/app/pages/issuance/pages/EditDSO'
import { dso } from '__fixtures__/authorizer'
import { IssuanceRoute } from 'v2/app/pages/issuance/router'
import { DSO } from 'v2/app/pages/issuance/components/DSO'

jest.mock('v2/app/pages/issuance/components/DSO', () => ({
  DSO: jest.fn(() => null)
}))

describe('EditDSO', () => {
  beforeEach(() => {
    history.push(IssuanceRoute.edit, { dsoId: dso._id })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<EditDSO />)
  })

  it('renders DSO with correct props', () => {
    render(<EditDSO />)

    expect(DSO).toHaveBeenCalledWith({ dsoId: dso._id, isEditing: true }, {})
  })
})
