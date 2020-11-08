/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DownloadSubscriptionDocument,
  DownloadSubscriptionDocumentProps
} from 'v2/app/pages/invest/components/DownloadSubscriptionDocument'
import { dso } from '__fixtures__/authorizer'
import { DownloadDocument } from 'v2/components/dataroom/DownloadDocument'

jest.mock(
  'v2/app/pages/invest/components/DownloadSubscriptionDocumentButton',
  () => ({ DownloadSubscriptionDocumentButton: jest.fn(() => null) })
)
jest.mock('v2/components/dataroom/DownloadDocument', () => ({
  DownloadDocument: jest.fn(({ children }) => children(console.log))
}))

describe('DownloadSubscriptionDocument', () => {
  const props: DownloadSubscriptionDocumentProps = { dso: dso }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DownloadSubscriptionDocument {...props} />)
  })

  it('renders DownloadDocument with correct props', () => {
    render(<DownloadSubscriptionDocument {...props} />)

    expect(DownloadDocument).toHaveBeenCalledTimes(1)
    expect(DownloadDocument).toHaveBeenCalledWith(
      {
        documentId: dso.subscriptionDocument._id,
        ownerId: dso.user,
        children: expect.anything()
      },
      {}
    )
  })

  it('renders DownloadDocument with correct props', () => {
    render(<DownloadSubscriptionDocument {...props} />)

    expect(DownloadDocument).toHaveBeenCalledTimes(1)
    expect(DownloadDocument).toHaveBeenCalledWith(
      {
        documentId: dso.subscriptionDocument._id,
        ownerId: dso.user,
        children: expect.anything()
      },
      {}
    )
  })
})
