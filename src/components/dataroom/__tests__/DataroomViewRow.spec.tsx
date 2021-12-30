import React from 'react'
import { render } from 'test-utils'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'
import {
  DataroomViewRow,
  DataroomViewRowProps
} from 'components/dataroom/DataroomViewRow'
import { document } from '__fixtures__/identity'
import { DataroomColumns } from 'components/dataroom/DataroomColumns'

jest.mock('components/dataroom/DataroomColumns', () => ({
  DataroomColumns: jest.fn(() => null)
}))

jest.mock('components/dataroom/DownloadDocument', () => ({
  DownloadDocument: jest.fn(() => null)
}))

describe('DataroomViewRow', () => {
  const props: DataroomViewRowProps = {
    title: 'test title',
    document: document
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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
})
