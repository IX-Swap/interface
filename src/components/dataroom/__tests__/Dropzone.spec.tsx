import React from 'react'
import { Dropzone, DropzoneProps } from 'components/dataroom/Dropzone'
import { document } from '__fixtures__/identity'
import { DataroomFileType } from 'config/dataroom'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import * as useAuthHook from 'hooks/auth/useAuth'

window.URL.revokeObjectURL = jest.fn()

describe('Dropzone', () => {
  const props: DropzoneProps = {
    label: 'Photo',
    documentInfo: {},
    value: document,
    name: 'photo',
    onChange: jest.fn(),
    accept: DataroomFileType.document,
    multiple: false
  }

  it('renders correct component when value is null and user is undefined', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: false,
      user: undefined
    })

    const { getByText } = render(
      <Form>
        <Dropzone {...props} />
      </Form>
    )

    expect(getByText(/drop or upload/i)).toBeInTheDocument()
  })
})
