/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DataroomHeader } from 'v2/app/pages/identity/components/dataroom/DataroomHeader'
import { DataroomItem } from 'v2/app/pages/identity/components/dataroom/DataroomItem'
import { DataroomAddDocument } from 'v2/app/pages/identity/components/dataroom/DataroomAddDocument'
import {
  noop,
  Dataroom,
  DataroomProps
} from 'v2/app/pages/identity/components/dataroom/Dataroom'
import { Form } from 'v2/components/form/Form'
import { documents } from '__fixtures__/identity'

jest.mock('v2/app/pages/identity/components/dataroom/DataroomItem', () => ({
  DataroomItem: jest.fn(() => null)
}))
jest.mock('v2/app/pages/identity/components/dataroom/DataroomHeader', () => ({
  DataroomHeader: jest.fn(() => null)
}))
jest.mock(
  'v2/app/pages/identity/components/dataroom/DataroomAddDocument',
  () => ({ DataroomAddDocument: jest.fn(() => null) })
)

describe('Dataroom', () => {
  const props: DataroomProps = {
    name: 'docs',
    isEditing: false,
    editable: false,
    EditComponent: jest.fn(() => null),
    ViewComponent: jest.fn(() => null),
    dataroomDocumentProps: { canDelete: false }
  }
  const defaultValues = {
    docs: documents.map(d => ({ ...d, id: d._id }))
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={defaultValues}>
        <Dataroom {...props} />
      </Form>
    )
  })

  it('does not render DataroomAddDocument, DataroomItem & DataroomHeader correctly if documents does not exist', () => {
    render(
      <Form defaultValues={{ documents: [] }}>
        <Dataroom {...props} />
      </Form>
    )

    expect(DataroomHeader).toHaveBeenCalledTimes(0)
    expect(DataroomItem).toHaveBeenCalledTimes(0)
    expect(DataroomAddDocument).toHaveBeenCalledTimes(0)
  })

  it('renders DataroomItem & DataroomHeader correctly if documents exist', () => {
    render(
      <Form defaultValues={defaultValues}>
        <Dataroom {...props} />
      </Form>
    )

    expect(DataroomHeader).toHaveBeenCalledTimes(1)
    expect(DataroomItem).toHaveBeenCalledTimes(defaultValues.docs.length)
    defaultValues.docs.forEach((doc, n) =>
      expect(DataroomItem).toHaveBeenNthCalledWith(
        n + 1,
        {
          name: props.name,
          isEditing: props.isEditing,
          EditComponent: props.EditComponent,
          ViewComponent: props.ViewComponent,
          dataroomDocumentProps: props.dataroomDocumentProps,
          document: doc,
          removeItem: noop,
          index: n
        },
        {}
      )
    )
  })

  it('renders DataroomAddDocument if isEditing & editable are true', () => {
    render(
      <Form defaultValues={defaultValues}>
        <Dataroom isEditing editable />
      </Form>
    )
    expect(DataroomAddDocument).toHaveBeenCalledTimes(1)
  })
})
