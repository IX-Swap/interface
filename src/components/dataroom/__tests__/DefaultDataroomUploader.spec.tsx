import React from 'react'
import { render } from 'test-utils'
import {
  DataroomRowUploader,
  DataroomRowUploaderProps
} from 'components/dataroom/DataroomRowUploader'
import { document } from '__fixtures__/identity'
import { Form } from 'components/form/Form'

describe('DefaultDataroomUploader', () => {
  const props: DataroomRowUploaderProps = {
    onChange: jest.fn(),
    value: document,
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    error: false,
    label: 'test label',
    name: 'test-name',
    documentInfo: {},
    control: {} as any
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <DataroomRowUploader {...props} />
      </Form>
    )
  })
})
