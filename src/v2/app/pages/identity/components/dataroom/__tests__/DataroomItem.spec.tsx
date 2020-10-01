/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'

import {
  DataroomItem,
  DataroomItemProps
} from 'v2/app/pages/identity/components/dataroom/DataroomItem'
import { document } from '__fixtures__/identity'
import { Form } from 'v2/components/form/Form'
import { fireEvent, waitFor } from '@testing-library/react'

describe('DataroomItem', () => {
  const props: DataroomItemProps = {
    document: {
      document,
      label: 'test label',
      title: 'test title',
      type: 'test type'
    },
    index: 1,
    isEditing: false,
    removeItem: jest.fn() as any
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

  it('handles delete item', async () => {
    const { getByRole } = render(
      <Form defaultValues={{}}>
        <DataroomItem {...props} isEditing />
      </Form>
    )

    fireEvent.click(getByRole('button'))
    await waitFor(() => {
      expect(props.removeItem).toHaveBeenCalledTimes(1)
      expect(props.removeItem).toHaveBeenCalledWith(props.index)
    })
  })
})
