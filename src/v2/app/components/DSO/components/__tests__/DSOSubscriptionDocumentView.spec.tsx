/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOSubscriptionDocumentView,
  DSOSubscriptionDocumentViewProps
} from 'v2/app/components/DSO/components/DSOSubscriptionDocumentView'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import { useTypedForm } from '__fixtures__/createTypedForm'
import * as dsoForm from 'v2/app/components/DSO/DSOForm'

jest.mock('v2/app/pages/identity/components/dataroom/DownloadDocument', () => ({
  DownloadDocument: jest.fn(() => null)
}))

describe('DSOSubscriptionDocumentView', () => {
  const props: DSOSubscriptionDocumentViewProps = {
    dsoOwnerId: 'test-dsoOwnerId',
    dsoId: 'test-dsoId'
  }
  const FormValue = jest.fn(({ children }) => children('testDocId'))

  beforeEach(() => {
    jest
      .spyOn(dsoForm, 'useDSOForm')
      .mockReturnValue({ ...useTypedForm(), FormValue } as any)
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DSOSubscriptionDocumentView {...props} />)
  })

  it('renders FormValue with correct props', () => {
    render(<DSOSubscriptionDocumentView {...props} />)

    expect(FormValue).toHaveBeenCalledTimes(1)
    expect(FormValue).toHaveBeenCalledWith(
      { name: 'subscriptionDocument', children: expect.anything() },
      {}
    )
  })

  it('renders DownloadDocument with correct props', () => {
    render(<DSOSubscriptionDocumentView {...props} />)

    expect(DownloadDocument).toHaveBeenCalledTimes(1)
    expect(DownloadDocument).toHaveBeenCalledWith(
      { documentId: 'testDocId', ownerId: props.dsoOwnerId },
      {}
    )
  })

  it('does not render DownloadDocument if dsoId is undefined', () => {
    render(<DSOSubscriptionDocumentView {...props} dsoId={undefined} />)

    expect(DownloadDocument).toHaveBeenCalledTimes(0)
  })
})
