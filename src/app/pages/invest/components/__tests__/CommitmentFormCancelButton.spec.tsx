import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  CommitmentFormCancelButton,
  CommitmentFormCancelButtonProps
} from 'app/pages/invest/components/CommitmentFormCancelButton'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { DSORoute } from 'app/pages/invest/router/config'
import { dso } from '__fixtures__/authorizer'
import { history } from 'config/history'
import { generatePath, Route } from 'react-router-dom'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('CommitmentFormCancelButton', () => {
  const props: CommitmentFormCancelButtonProps = {}

  beforeEach(() => {
    history.push(
      generatePath(DSORoute.makeInvestment, {
        dsoId: dso._id,
        issuerId: dso.user
      })
    )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<CommitmentFormCancelButton {...props} />)
  })

  it('renders AppRouterLink with correct props', () => {
    render(
      <Route path={DSORoute.makeInvestment}>
        <CommitmentFormCancelButton {...props} />
      </Route>
    )

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
        to: DSORoute.view,
        params: { dsoId: dso._id, issuerId: dso.user }
      }),
      {}
    )
  })
})
