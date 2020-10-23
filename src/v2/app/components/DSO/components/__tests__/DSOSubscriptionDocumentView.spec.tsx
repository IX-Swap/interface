/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DSOSubscriptionDocumentView,
  DSOSubscriptionDocumentViewProps
} from 'v2/app/components/DSO/components/DSOSubscriptionDocumentView'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import { dso } from '__fixtures__/authorizer'
import { Form } from 'v2/components/form/Form'

jest.mock('v2/app/pages/identity/components/dataroom/DownloadDocument', () => ({
  DownloadDocument: jest.fn(() => null)
}))

describe('DSOSubscriptionDocumentView', () => {
  const props: DSOSubscriptionDocumentViewProps = {
    dsoOwnerId: dso.user,
    dsoId: dso._id
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DSOSubscriptionDocumentView {...props} />
      </Form>
    )
  })

  it('renders DownloadDocument with correct props', () => {
    render(
      <Form defaultValues={{ subscriptionDocument: dso.subscriptionDocument }}>
        <DSOSubscriptionDocumentView {...props} />
      </Form>
    )

    expect(DownloadDocument).toHaveBeenCalledTimes(1)
    expect(DownloadDocument).toHaveBeenCalledWith(
      { documentId: dso.subscriptionDocument._id, ownerId: props.dsoOwnerId },
      {}
    )
  })

  it('does not render DownloadDocument if dsoId is undefined', () => {
    render(
      <Form>
        <DSOSubscriptionDocumentView {...props} dsoId={undefined} />
      </Form>
    )

    expect(DownloadDocument).toHaveBeenCalledTimes(0)
  })
})
