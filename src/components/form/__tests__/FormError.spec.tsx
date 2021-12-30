import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { FormError, FormErrorProps } from 'components/form/FormError'
import * as useFormErrorHook from 'hooks/useFormError'

describe('FormError', () => {
  const props: FormErrorProps = {
    name: 'name',
    render: jest.fn(() => null)
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <FormError {...props} />
      </Form>
    )
  })

  it('does not calls render function if there is no error', () => {
    jest.spyOn(useFormErrorHook, 'useFormError').mockReturnValue({
      hasError: false,
      error: undefined
    })

    render(
      <Form>
        <FormError {...props} />
      </Form>
    )

    expect(props.render).not.toHaveBeenCalled()
  })

  it('calls render function if there is an error', () => {
    const error = {
      message: 'some error',
      type: 'error type'
    }

    jest.spyOn(useFormErrorHook, 'useFormError').mockReturnValue({
      hasError: true,
      error
    })

    render(
      <Form>
        <FormError {...props} />
      </Form>
    )

    expect(props.render).toHaveBeenCalledWith({ error })
  })
})
