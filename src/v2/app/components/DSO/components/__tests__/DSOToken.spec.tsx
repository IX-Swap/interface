/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSOToken } from 'v2/app/components/DSO/components/DSOToken'
import * as useDSOByIdHook from 'v2/app/pages/invest/hooks/useDSOById'
import { dso } from '__fixtures__/authorizer'
import { history } from 'v2/history'
import { IssuanceRoute } from 'v2/app/pages/issuance/router'

describe('DSOToken', () => {
  beforeEach(() => {
    history.push(IssuanceRoute.create, { dsoId: dso._id })
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
