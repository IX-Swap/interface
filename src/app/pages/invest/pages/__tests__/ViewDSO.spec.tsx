import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewDSO } from 'app/pages/invest/pages/ViewDSO'
import { history } from 'config/history'
import { DSORoute } from 'app/pages/invest/router/config'
import { InvestLink } from 'app/pages/invest/components/InvestLink'
import { dso } from '__fixtures__/authorizer'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { DSOView } from 'app/components/DSO/DSOView'
import { generatePath } from 'react-router-dom'

jest.mock('app/components/DSO/DSOView', () => ({
  DSOView: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/InvestLink', () => ({
  InvestLink: jest.fn(() => null)
}))

describe('ViewDSO', () => {
  beforeEach(() => {
    history.push(
      generatePath(DSORoute.view, { dsoId: dso._id, issuerId: dso.user })
    )
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(<ViewDSO />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: true, data: dso } as any)
    const { container } = render(<ViewDSO />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders DSOForm with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<ViewDSO />)

    expect(DSOView).toHaveBeenCalledWith({ data: dso }, {})
  })

  it('renders InvestLink correctly', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<ViewDSO />)

    expect(InvestLink).toHaveBeenCalled()
  })
})
