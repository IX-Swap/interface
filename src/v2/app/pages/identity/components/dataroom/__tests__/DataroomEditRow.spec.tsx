/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DataroomColumns } from 'v2/app/pages/identity/components/dataroom/DataroomColumns'
import {
  DataroomEditRow,
  DataroomEditRowProps
} from 'v2/app/pages/identity/components/dataroom/DataroomEditRow'
import { document } from '__fixtures__/identity'

jest.mock('v2/app/pages/identity/components/dataroom/DataroomColumns', () => ({
  DataroomColumns: jest.fn(() => null)
}))
describe('DataroomEditRow', () => {
  const props: DataroomEditRowProps = {
    input: <div data-testid='input' />,
    document: document,
    title: 'Test title'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DataroomEditRow {...props} />)
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
