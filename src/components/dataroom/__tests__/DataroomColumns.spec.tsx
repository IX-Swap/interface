import React from 'react'
import { render } from 'test-utils'
import { formatDateAndTime } from 'helpers/dates'
import {
  DataroomColumns,
  DataroomColumnsProps
} from 'components/dataroom/DataroomColumns'
import { document } from '__fixtures__/identity'

describe('DataroomColumns', () => {
  const props: DataroomColumnsProps = {
    title: 'Test title',
    document
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DataroomColumns {...props} />)
  })

  it('renders title if document is null', () => {
    const { container } = render(<DataroomColumns {...props} document={null} />)
    expect(container).toHaveTextContent(props.title)
  })

  it('renders originalFileName, createdAt, title & type if document exists', () => {
    const { container } = render(<DataroomColumns {...props} />)
    expect(container).toHaveTextContent(document.originalFileName)
    expect(container).toHaveTextContent(
      formatDateAndTime(document.createdAt, true)
    )
    expect(container).toHaveTextContent(document.type)
  })
})
