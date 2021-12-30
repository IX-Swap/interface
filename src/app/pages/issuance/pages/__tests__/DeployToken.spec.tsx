import React from 'react'
import { render } from 'test-utils'
import { DeployToken } from 'app/pages/issuance/pages/DeployToken'
import { history } from 'config/history'
import { IssuanceRoute } from '../../router/config'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { user } from '__fixtures__/user'
import { DeployTokenMessagesList } from 'app/pages/issuance/components/DeployTokenMessagesList'
import { DeployTokenButton } from 'app/pages/issuance/components/DeployTokenButton'
import { DSOTitle } from 'app/components/DSO/components/DSOTitle'

jest.mock('app/pages/issuance/components/DeployTokenMessagesList', () => ({
  DeployTokenMessagesList: jest.fn(() => null)
}))
jest.mock('app/components/DSO/components/DSOTitle', () => ({
  DSOTitle: jest.fn(() => null)
}))
jest.mock('app/pages/issuance/components/DeployTokenButton', () => ({
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
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

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
