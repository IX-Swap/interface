/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { CommitmentFormWrapper } from 'v2/app/pages/invest/components/CommitmentFormWrapper'
import * as useDSOByIdHook from 'v2/app/pages/invest/hooks/useDSOById'
import { history } from 'v2/history'
import { dso } from '__fixtures__/authorizer'
import { OfferingRoute } from 'v2/app/pages/invest/routers/offeringsRouter'
import { CommitmentHeader } from 'v2/app/pages/invest/components/CommitmentHeader'
import { CommitmentFormFields } from 'v2/app/pages/invest/components/CommitmentFormFields'
import { DownloadDSOSubscriptionDocument } from 'v2/app/components/DSO/components/DownloadDSOSubscriptionDocument'
import { CommitmentFormSubmitButton } from 'v2/app/pages/invest/components/CommitmentFormSubmitButton'
import { CommitmentFormCancelButton } from 'v2/app/pages/invest/components/CommitmentFormCancelButton'

jest.mock('v2/app/pages/invest/components/CommitmentHeader', () => ({
  CommitmentHeader: jest.fn(() => null)
}))
jest.mock('v2/app/pages/invest/components/CommitmentFormFields', () => ({
  CommitmentFormFields: jest.fn(() => null)
}))
jest.mock(
  'v2/app/components/DSO/components/DownloadDSOSubscriptionDocument',
  () => ({ DownloadDSOSubscriptionDocument: jest.fn(() => null) })
)
jest.mock('v2/app/pages/invest/components/CommitmentFormSubmitButton', () => ({
  CommitmentFormSubmitButton: jest.fn(() => null)
}))
jest.mock('v2/app/pages/invest/components/CommitmentFormCancelButton', () => ({
  CommitmentFormCancelButton: jest.fn(() => null)
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

    expect(CommitmentHeader).toHaveBeenCalledWith({ dso: dso }, {})
  })

  it('renders CommitmentFormFields with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<CommitmentFormWrapper />)

    expect(CommitmentFormFields).toHaveBeenCalledWith(
      { symbol: dso.currency.symbol },
      {}
    )
  })

  it('renders DownloadDSOSubscriptionDocument with correct props', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)

    render(<CommitmentFormWrapper />)

    expect(DownloadDSOSubscriptionDocument).toHaveBeenCalledWith(
      expect.objectContaining({ dsoId: dso._id }),
      {}
    )
  })

  it('renders CommitmentFormSubmitButton correctly', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<CommitmentFormWrapper />)

    expect(CommitmentFormSubmitButton).toHaveBeenCalled()
  })

  it('renders CommitmentFormCancelButton correctly', () => {
    jest
      .spyOn(useDSOByIdHook, 'useDSOById')
      .mockReturnValue({ isLoading: false, data: dso } as any)
    render(<CommitmentFormWrapper />)

    expect(CommitmentFormCancelButton).toHaveBeenCalled()
  })
})
