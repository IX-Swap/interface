import React from 'react'
import { render } from 'test-utils'
import { history } from 'config/history'
import { ViewDSO } from 'app/pages/issuance/pages/ViewDSO'
import { dso } from '__fixtures__/authorizer'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { generatePath } from 'react-router-dom'

jest.mock('app/pages/issuance/components/DSO', () => ({
  DSO: jest.fn(() => null)
}))

describe('ViewDSO', () => {
  beforeEach(() => {
    history.push(
      generatePath(IssuanceRoute.view, { dsoId: dso._id, issuerId: dso.user })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<ViewDSO />)
  })

  // it('renders DSO with correct props', () => {
  //   render(
  //     <Route path={IssuanceRoute.view}>
  //       <ViewDSO />
  //     </Route>
  //   )

  //   expect(DSO).toHaveBeenCalledWith(
  //     {
  //       dsoId: dso._id,
  //       issuerId: dso.user,
  //       showAuthorizations: true,
  //       showSidebar: true
  //     },
  //     {}
  //   )
  // })
})
