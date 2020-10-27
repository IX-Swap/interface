/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  IdentityDataroomUploader,
  IdentityDataroomUploaderProps
} from 'v2/components/dataroom/IdentityDataroomUploader'
import { document } from '__fixtures__/identity'
import { Form } from 'v2/components/form/Form'

describe('IdentityDataroomUploader', () => {
  const props: IdentityDataroomUploaderProps = {
    value: document,
    name: 'test-name',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    onFocus: jest.fn(),
    error: false,
    label: 'test label',
    control: {} as any
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <IdentityDataroomUploader {...props} />
      </Form>
    )
  })
})
