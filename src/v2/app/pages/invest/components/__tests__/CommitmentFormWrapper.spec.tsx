/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CommitmentFormWrapper } from 'v2/app/pages/invest/components/CommitmentFormWrapper'
import * as useDSOByIdHook from 'v2/app/pages/invest/hooks/useDSOById'
import { history } from 'v2/history'
import { dso } from '__fixtures__/authorizer'
import { OfferingRoute } from 'v2/app/pages/invest/routers/offeringsRouter'
import { CommitmentHeader } from 'v2/app/pages/invest/components/CommitmentHeader'

jest.mock('v2/app/pages/invest/components/CommitmentHeader', () => ({
  CommitmentHeader: jest.fn(() => null)
}))

describe('CommitmentFormWrapper', () => {
  beforeEach(() => {
    history.push(OfferingRoute.view, { dsoId: dso._id, issuerId: dso.user })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    render(<CommitmentFormWrapper />)
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: true, data: dso } as any)
    const { container } = render(<CommitmentFormWrapper />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if data is not defined', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: undefined } as any)
    const { container } = render(<CommitmentFormWrapper />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders CommitmentHeader with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<CommitmentFormWrapper />)

    // expect(CommitmentHeader).toHaveBeenCalledTimes(1)
    expect(CommitmentHeader).toHaveBeenNthCalledWith(1, { dso: dso }, {})
  })
})
