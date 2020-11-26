import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOFormBackButton } from 'v2/app/components/DSO/components/DSOFormBackButton'
import { dso } from '__fixtures__/authorizer'
import { history } from 'v2/history'
import { IssuanceRoute } from 'v2/app/pages/issuance/router'

describe('DSOFormBackButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error if current path matches create path', () => {
    history.push(IssuanceRoute.create, { dsoId: dso._id })
    render(<DSOFormBackButton />)
  })

  it('renders without error if current path does not match create path', () => {
    history.push(IssuanceRoute.view, { dsoId: dso._id })
    render(<DSOFormBackButton />)
  })
})
