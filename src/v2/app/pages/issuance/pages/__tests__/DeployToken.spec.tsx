/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DeployToken } from 'v2/app/pages/issuance/pages/DeployToken'
import { history } from 'v2/history'
import { IssuanceRoute } from '../../router'
import * as useDSOByIdHook from 'v2/app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { user } from '__fixtures__/user'

describe('DeployToken', () => {
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
    render(<DeployToken />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: true, data: dso } as any)
    const { container } = render(<DeployToken />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is not defined', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: undefined } as any)
    const { container } = render(<DeployToken />)

    expect(container).toBeEmptyDOMElement()
  })
})
