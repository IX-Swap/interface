import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestOfferingView } from 'app/pages/invest/pages/InvestOfferingView'
import { history } from 'config/history'
import { OfferingRoute } from 'app/pages/invest/routers/offeringsRouter'
import { InvestLink } from 'app/pages/invest/components/InvestLink'
import { dso } from '__fixtures__/authorizer'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { DSOView } from 'app/components/DSO/DSOView'

jest.mock('app/components/DSO/DSOView', () => ({
  DSOView: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/InvestLink', () => ({
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

    expect(DSOView).toHaveBeenCalledWith({ data: dso }, {})
  })

  it('renders InvestLink correctly', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<InvestOfferingView />)

    expect(InvestLink).toHaveBeenCalled()
  })
})
