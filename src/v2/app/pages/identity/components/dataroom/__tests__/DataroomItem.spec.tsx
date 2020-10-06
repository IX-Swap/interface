/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DataroomItem,
  DataroomItemProps
} from 'v2/app/pages/identity/components/dataroom/DataroomItem'
import { document } from '__fixtures__/identity'
import { Form } from 'v2/components/form/Form'

describe('DataroomItem', () => {
  const props: DataroomItemProps = {
    name: 'name',
    document: {
      document,
      label: 'test label',
      title: 'test title',
      type: 'test type'
    },
    index: 1,
    isEditing: false,
    removeItem: jest.fn(),
    dataroomDocumentProps: undefined,
    ViewComponent: () => null,
    EditComponent: () => null
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={{}}>
        <DataroomItem {...props} />
      </Form>
    )
  })
})
