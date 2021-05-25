import React from 'react'
import { render, cleanup } from 'test-utils'
import { ViewDSO } from 'app/pages/invest/pages/ViewDSO'
import { history } from 'config/history'
import { dso } from '__fixtures__/authorizer'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { generatePath } from 'react-router-dom'
import { InvestRoute } from 'app/pages/invest/router/config'

jest.mock('app/__tests__/DSO/DSOView', () => ({
  DSOView: jest.fn(() => null)
}))

jest.mock('app/pages/invest/__tests__/InvestLink', () => ({
  InvestLink: jest.fn(() => null)
}))

window.URL.revokeObjectURL = jest.fn()

describe('ViewDSO', () => {
  beforeEach(() => {
    history.push(
      generatePath(InvestRoute.view, { dsoId: dso._id, issuerId: dso.user })
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
})
