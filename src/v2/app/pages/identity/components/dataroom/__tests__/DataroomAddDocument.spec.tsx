/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup, fireEvent, waitFor } from 'test-utils'
import * as dataroomUploader from 'v2/components/form/DataroomUploader'
import {
  DataroomAddDocument,
  DataroomAddDocumentProps
} from 'v2/app/pages/identity/components/dataroom/DataroomAddDocument'
import { ServicesProvider } from 'v2/services/useServices'

describe('DataroomAddDocument', () => {
  const props: DataroomAddDocumentProps = {
    append: jest.fn(),
    documentInfo: {
      type: '',
      feature: '',
      resourceId: '',
      title: ''
    }
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DataroomAddDocument {...props} button={<div />} />)
  })

  it('calls append function for every uploaded file', async () => {
    const fileContents = 'hello world'
    const file = new Blob([fileContents], { type: 'text/plain' })
    const files = [file, file, file]
    const data = new Array(files.length).fill(file)
    const post = jest.fn().mockResolvedValueOnce({ data })

    const { getByLabelText } = render(
      <ServicesProvider value={{ apiService: { post } }}>
        <DataroomAddDocument {...props} />
      </ServicesProvider>
    )
    const input = getByLabelText(/upload/i)

    fireEvent.change(input, { target: { files } })
    await waitFor(() => {
      expect(props.append).toHaveBeenCalledTimes(files.length)
    })
  })

  it('renders DataroomUploader with correct documentInfo', () => {
    const DataroomUploader = jest.fn(() => <div />)
    jest
      .spyOn(dataroomUploader, 'DataroomUploader')
      .mockImplementationOnce(DataroomUploader)

    render(<DataroomAddDocument {...props} />)

    expect(DataroomUploader).toHaveBeenCalledWith(
      expect.objectContaining({
        documentInfo: props.documentInfo
      }),
      {}
    )
  })
})
