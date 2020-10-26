/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  AuthorizationDocument,
  AuthorizationDocumentProps,
  isImage
} from 'v2/app/pages/authorizer/components/AuthorizationDocument'
import { document } from '__fixtures__/identity'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { DownloadDocument } from 'v2/components/dataroom/DownloadDocument'

jest.mock('v2/app/components/DSO/components/ViewDocument', () => ({
  ViewDocument: jest.fn(({ children }) => children())
}))
jest.mock('v2/components/dataroom/DownloadDocument', () => ({
  DownloadDocument: jest.fn(({ children }) => children())
}))

describe('AuthorizationDocument', () => {
  const props: AuthorizationDocumentProps = {
    value: document
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AuthorizationDocument {...props} />)
  })

  it('renders nothing if document is null', () => {
    const { container } = render(
      <AuthorizationDocument {...props} value={null} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders ViewDocument with correct props', () => {
    render(<AuthorizationDocument {...props} />)

    expect(ViewDocument).toHaveBeenCalledTimes(1)
    expect(ViewDocument).toHaveBeenCalledWith(
      { documentId: document._id, ownerId: '', children: expect.any(Function) },
      {}
    )
  })

  it('renders DownloadDocument with correct props', () => {
    render(<AuthorizationDocument {...props} />)

    expect(DownloadDocument).toHaveBeenCalledWith(
      {
        documentId: document._id,
        ownerId: document.user,
        children: expect.any(Function)
      },
      {}
    )
  })
})

describe('isImage', () => {
  it('returns true if filename has valid extension', () => {
    expect(isImage('.png')).toBe(true)
    expect(isImage('.jpg')).toBe(true)
    expect(isImage('.jpeg')).toBe(true)
  })

  it('returns false if filename has invalid extension', () => {
    expect(isImage('.txt')).toBe(false)
  })
})
