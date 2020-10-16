/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestOfferingView } from 'v2/app/pages/invest/pages/InvestOfferingView'
import { history } from 'v2/history'
import { OfferingRoute } from 'v2/app/pages/invest/routers/offeringsRouter'
import { DSOForm } from 'v2/app/components/DSO/DSOForm'
import { InvestLink } from 'v2/app/pages/invest/components/InvestLink'
import { dso } from '__fixtures__/authorizer'
import * as useDSOByIdHook from 'v2/app/pages/invest/hooks/useDSOById'

jest.mock('v2/app/components/DSO/DSOForm', () => ({
  DSOForm: jest.fn(() => null)
}))
jest.mock('v2/app/pages/invest/components/InvestLink', () => ({
  InvestLink: jest.fn(() => null)
}))

describe('InvestOfferingView', () => {
  beforeEach(() => {
    history.push(OfferingRoute.view, { dsoId: dso._id, issuerId: dso.user })
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
    render(<InvestOfferingView />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: true, data: dso } as any)
    const { container } = render(<InvestOfferingView />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders DSOForm with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<InvestOfferingView />)

    expect(DSOForm).toHaveBeenCalledWith({ data: dso }, {})
  })

  it('renders InvestLink correctly', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<InvestOfferingView />)

    expect(InvestLink).toHaveBeenCalled()
  })
})
