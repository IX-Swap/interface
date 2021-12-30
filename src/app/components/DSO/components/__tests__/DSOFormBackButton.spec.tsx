import React from 'react'
import { render } from 'test-utils'
import { DSOFormBackButton } from 'app/components/DSO/components/DSOFormBackButton'
import { dso } from '__fixtures__/authorizer'
import { history } from 'config/history'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

describe('DSOFormBackButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error if current path matches create path', () => {
    history.push(IssuanceRoute.create, { dsoId: dso._id })
    render(<DSOFormBackButton />)
  })

  it.skip('renders without error if current path does not match create path', () => {
    history.push(IssuanceRoute.view, { dsoId: dso._id })
    render(<DSOFormBackButton />)
  })
})
