import React from 'react'
import { render, cleanup } from 'test-utils'
import { history } from 'v2/history'
import { IssuanceRoute } from '../../router'
import {
  DeployTokenMessagesList,
  DeployTokenMessagesListProps
} from 'v2/app/pages/issuance/components/DeployTokenMessagesList'
import { dso } from '__fixtures__/authorizer'
import { user } from '__fixtures__/user'

describe('DeployTokenMessagesList', () => {
  const props: DeployTokenMessagesListProps = { isInitializing: true }
  beforeEach(() => {
    history.push(IssuanceRoute.deployToken, {
      dsoId: dso._id,
      issuerId: user._id
    })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<DeployTokenMessagesList {...props} />)
  })
})
