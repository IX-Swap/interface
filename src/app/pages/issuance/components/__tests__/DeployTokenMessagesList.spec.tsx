import React from 'react'
import { render } from 'test-utils'
import { history } from 'config/history'
import { IssuanceRoute } from '../../router/config'
import {
  DeployTokenMessagesList,
  DeployTokenMessagesListProps
} from 'app/pages/issuance/components/DeployTokenMessagesList'
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
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it.skip('renders without error', () => {
    render(<DeployTokenMessagesList {...props} />)
  })
})
