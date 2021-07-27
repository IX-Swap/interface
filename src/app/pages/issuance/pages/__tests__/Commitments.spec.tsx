import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { generatePath, Route } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { history } from 'config/history'
import { Commitments } from 'app/pages/issuance/pages/Commitments'

describe('Commitments', () => {
  beforeEach(() => {
    history.push(
      generatePath(IssuanceRoute.view, { dsoId: dso._id, issuerId: dso.user })
    )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(
      <Route path={IssuanceRoute.commitments}>
        <Commitments />
      </Route>
    )
  })
})
