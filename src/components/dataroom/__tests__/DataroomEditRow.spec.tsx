import React from 'react'
import { render } from 'test-utils'
import { DataroomColumns } from 'components/dataroom/DataroomColumns'
import {
  DataroomEditRow,
  DataroomEditRowProps
} from 'components/dataroom/DataroomEditRow'
import { document } from '__fixtures__/identity'

jest.mock('components/dataroom/DataroomColumns', () => ({
  DataroomColumns: jest.fn(() => null)
}))

describe('DataroomEditRow', () => {
  const props: DataroomEditRowProps = {
    actions: <div data-testid='input' />,
    document: document,
    title: 'Test title'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DataroomEditRow {...props} />)
  })

  it('renders input correctly', () => {
    const { queryByTestId } = render(<DataroomEditRow {...props} />)

    expect(queryByTestId('input')).not.toBeNull()
  })

  it('renders DataroomColumns correctly', () => {
    render(<DataroomEditRow {...props} />)

    expect(DataroomColumns).toHaveBeenCalledTimes(1)
    expect(DataroomColumns).toHaveBeenCalledWith(
      {
        title: props.title,
        document: props.document
      },
      {}
    )
  })
})
