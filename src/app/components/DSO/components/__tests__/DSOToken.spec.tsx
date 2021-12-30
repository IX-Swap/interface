import React from 'react'
import { render } from 'test-utils'
import { DSOToken } from 'app/components/DSO/components/DSOToken'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { history } from 'config/history'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

describe('DSOToken', () => {
  beforeEach(() => {
    history.push(IssuanceRoute.create, { dsoId: dso._id })
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it.skip('renders without error', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<DSOToken />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: true, data: dso } as any)
    const { container } = render(<DSOToken />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is not defined', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: undefined } as any)
    const { container } = render(<DSOToken />)

    expect(container).toBeEmptyDOMElement()
  })
})
