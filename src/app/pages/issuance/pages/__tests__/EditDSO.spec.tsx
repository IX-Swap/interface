import React from 'react'
import { render, cleanup } from 'test-utils'
import { history } from 'config/history'
import { EditDSO } from 'app/pages/issuance/pages/EditDSO'
import { dso } from '__fixtures__/authorizer'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { DSO } from 'app/pages/issuance/components/DSO'
import { generatePath, Route } from 'react-router-dom'

jest.mock('app/pages/issuance/components/DSO', () => ({
  DSO: jest.fn(() => null)
}))

describe('EditDSO', () => {
  beforeEach(() => {
    history.push(generatePath(IssuanceRoute.edit, { dsoId: dso._id }))
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<EditDSO />)
  })

  it('renders DSO with correct props', () => {
    render(
      <Route path={IssuanceRoute.edit}>
        <EditDSO />
      </Route>
    )

    expect(DSO).toHaveBeenCalledWith({ dsoId: dso._id, isEditing: true }, {})
  })
})
