import React from 'react'
import { render } from 'test-utils'
import { CommitmentFormWrapper } from 'app/pages/invest/components/CommitmentFormWrapper'
import * as useDSOByIdHook from 'app/pages/invest/hooks/useDSOById'
import { history } from 'config/history'
import { dso } from '__fixtures__/authorizer'
import { CommitmentHeader } from 'app/pages/invest/components/CommitmentHeader'
import { CommitmentFormFields } from 'app/pages/invest/components/CommitmentFormFields'
import { DownloadDSOSubscriptionDocument } from 'app/components/DSO/components/DownloadDSOSubscriptionDocument'
import { CommitmentFormSubmitButton } from 'app/pages/invest/components/CommitmentFormSubmitButton'
import { CommitmentFormCancelButton } from 'app/pages/invest/components/CommitmentFormCancelButton'
import { generatePath } from 'react-router-dom'
import { InvestRoute } from 'app/pages/invest/router/config'

jest.mock('app/pages/invest/components/CommitmentHeader', () => ({
  CommitmentHeader: jest.fn(() => null)
}))
jest.mock('app/pages/invest/components/CommitmentFormFields', () => ({
  CommitmentFormFields: jest.fn(() => null)
}))
jest.mock(
  'app/components/DSO/components/DownloadDSOSubscriptionDocument',
  () => ({ DownloadDSOSubscriptionDocument: jest.fn(() => null) })
)
jest.mock('app/pages/invest/components/CommitFormCommitButton', () => ({
  CommitmentFormCommitButton: jest.fn(() => null)
}))

jest.mock('app/pages/invest/components/CommitmentFormSubmitButton', () => ({
  CommitmentFormSubmitButton: jest.fn(() => null)
}))
jest.mock('app/pages/invest/components/CommitmentFormCancelButton', () => ({
  CommitmentFormCancelButton: jest.fn(() => null)
}))

describe('CommitmentFormWrapper', () => {
  beforeEach(() => {
    history.push(
      generatePath(InvestRoute.view, { dsoId: dso._id, issuerId: dso.user })
    )
  })

  afterEach(async () => {
    jest.clearAllMocks()
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
      {
        symbol: dso.currency.symbol,
        network: dso.network?._id,
        isCampaign: false
      },
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
