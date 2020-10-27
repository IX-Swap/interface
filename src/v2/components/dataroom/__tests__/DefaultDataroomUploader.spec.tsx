/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DefaultDataroomUploader,
  DefaultDataroomUploaderProps
} from 'v2/components/dataroom/DefaultDataroomUploader'
import { document } from '__fixtures__/identity'
import { Form } from 'v2/components/form/Form'

describe('DefaultDataroomUploader', () => {
  const props: DefaultDataroomUploaderProps = {
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
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <DefaultDataroomUploader {...props} />
      </Form>
    )
  })
})
