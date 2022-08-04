import { BackToDSOButton } from 'app/pages/invest/components/MakeCommitment/BackToDSOButton'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { history } from 'config/history'
import { generatePath, Route } from 'react-router-dom'
import { InvestRoute } from 'app/pages/invest/router/config'

describe('BackToDSOButton', () => {
  beforeEach(() => {
    history.push(
      generatePath(InvestRoute.view, { dsoId: '1231', issuerId: 1231 })
    )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Route path={InvestRoute.view}>
        <BackToDSOButton />
      </Route>
    )
  })

  it('should match snapshot', () => {
    const { container } = render(
      <Route path={InvestRoute.view}>
        <BackToDSOButton />
      </Route>
    )

    expect(container).toMatchSnapshot()
  })
})
