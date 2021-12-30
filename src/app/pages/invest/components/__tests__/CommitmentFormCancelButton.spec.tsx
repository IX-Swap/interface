import React from 'react'
import { render } from 'test-utils'
import {
  CommitmentFormCancelButton,
  CommitmentFormCancelButtonProps
} from 'app/pages/invest/components/CommitmentFormCancelButton'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { dso } from '__fixtures__/authorizer'
import { history } from 'config/history'
import { generatePath, Route } from 'react-router-dom'
import { InvestRoute } from 'app/pages/invest/router/config'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLinkComponent: jest.fn(() => null)
}))

describe('CommitmentFormCancelButton', () => {
  const props: CommitmentFormCancelButtonProps = {}

  beforeEach(() => {
    history.push(
      generatePath(InvestRoute.makeInvestment, {
        dsoId: dso._id,
        issuerId: dso.user
      })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders AppRouterLink with correct props', () => {
    render(
      <Route path={InvestRoute.makeInvestment}>
        <CommitmentFormCancelButton {...props} />
      </Route>
    )

    expect(AppRouterLinkComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        children: expect.anything(),
        to: InvestRoute.view,
        params: { dsoId: dso._id, issuerId: dso.user }
      }),
      {}
    )
  })
})
