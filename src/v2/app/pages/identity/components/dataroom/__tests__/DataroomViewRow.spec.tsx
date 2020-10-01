/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import {
  DataroomViewRow,
  DataroomRowProps
} from 'v2/app/pages/identity/components/dataroom/DataroomViewRow'
import { document } from '__fixtures__/identity'
import { DataroomColumns } from 'v2/app/pages/identity/components/dataroom/DataroomColumns'

jest.mock('v2/app/pages/identity/components/dataroom/DataroomColumns', () => ({
  DataroomColumns: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/dataroom/DownloadDocument', () => ({
  DownloadDocument: jest.fn(() => null)
}))
describe('DataroomViewRow', () => {
  const props: DataroomRowProps = { title: 'test title', document: document }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DataroomViewRow {...props} />)
  })

  it('renders DataroomColumns correctly', () => {
    render(<DataroomViewRow {...props} />)

    expect(DataroomColumns).toHaveBeenCalledTimes(1)
    expect(DataroomColumns).toHaveBeenCalledWith(
      {
        title: props.title,
        document: props.document
      },
      {}
    )
  })

  it('renders DownloadDocument correctly', () => {
    render(<DataroomViewRow {...props} />)

    expect(DownloadDocument).toHaveBeenCalledTimes(1)
    expect(DownloadDocument).toHaveBeenCalledWith(
      {
        documentId: document._id,
        ownerId: document.user
      },
      {}
    )
  })

  it('renders nothing if document is null', () => {
    const { container } = render(<DataroomViewRow {...props} document={null} />)

    expect(container).toBeEmptyDOMElement()
  })
})
