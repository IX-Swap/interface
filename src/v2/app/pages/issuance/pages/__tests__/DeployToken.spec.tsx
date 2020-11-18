import React from 'react'
import { render, cleanup } from 'test-utils'
import { DeployToken } from 'v2/app/pages/issuance/pages/DeployToken'
import { history } from 'v2/history'
import { IssuanceRoute } from '../../router'
import * as useDSOByIdHook from 'v2/app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { user } from '__fixtures__/user'
import { DeployTokenMessagesList } from 'v2/app/pages/issuance/components/DeployTokenMessagesList'
import { DeployTokenButton } from 'v2/app/pages/issuance/components/DeployTokenButton'
import { DSOTitle } from 'v2/app/components/DSO/components/DSOTitle'

jest.mock('v2/app/pages/issuance/components/DeployTokenMessagesList', () => ({
  DeployTokenMessagesList: jest.fn(() => null)
}))
jest.mock('v2/app/components/DSO/components/DSOTitle', () => ({
  DSOTitle: jest.fn(() => null)
}))
jest.mock('v2/app/pages/issuance/components/DeployTokenButton', () => ({
  DeployTokenButton: jest.fn(() => null)
}))

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
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<DeployToken />)
  })

  it('renders DSOTitle with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<DeployToken />)

    expect(DSOTitle).toHaveBeenCalled()
    expect(DSOTitle).toHaveBeenCalledWith({ dso: dso }, {})
  })

  it('renders DeployTokenMessagesList & DeployTokenButton with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<DeployToken />)

    expect(DeployTokenMessagesList).toHaveBeenCalled()
    expect(DeployTokenButton).toHaveBeenCalled()
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
