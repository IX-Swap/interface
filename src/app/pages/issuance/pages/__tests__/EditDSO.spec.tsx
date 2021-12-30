import React from 'react'
import { render } from 'test-utils'
import { history } from 'config/history'
import { EditDSO } from 'app/pages/issuance/pages/EditDSO'
import { dso } from '__fixtures__/authorizer'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { DSO } from 'app/pages/issuance/components/DSO'
import { generatePath, Route } from 'react-router-dom'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'

jest.mock('app/pages/issuance/components/DSO', () => ({
  DSO: jest.fn(() => null)
}))

describe('EditDSO', () => {
  beforeEach(() => {
    history.push(
      generatePath(IssuanceRoute.edit, { dsoId: dso._id, issuerId: dso.user })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders DSO with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ data: dso } as any)

    render(
      <Route path={IssuanceRoute.edit}>
        <EditDSO />
      </Route>
    )

    expect(DSO).toHaveBeenCalledWith(
      { dsoId: dso._id, issuerId: dso.user, isEditing: true },
      {}
    )
  })
})
