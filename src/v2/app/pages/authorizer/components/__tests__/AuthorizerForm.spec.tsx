/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as useTypedFormHook from 'v2/components/form/useTypedForm'
import { useTypedForm } from '__fixtures__/createTypedForm'
import {
  AuthorizerForm,
  AuthorizerFormProps
} from 'v2/app/pages/authorizer/components/AuthorizerForm'
import { ApproveButton } from '../ApproveButton'
import { RejectButton } from '../RejectButton'

jest.mock('../ApproveButton', () => ({ ApproveButton: jest.fn(() => null) }))
jest.mock('../RejectButton', () => ({ RejectButton: jest.fn(() => null) }))

describe('AuthorizerForm', () => {
  const props: AuthorizerFormProps = {
    itemId: 'test-itemId',
    defaultValues: { comment: 'test comment', sharedWithUser: false }
  }
  const TextField = jest.fn(() => <div />)
  const Checkbox = jest.fn(() => <div />)
  const Form = jest.fn(({ children }) => children)

  beforeEach(() => {
    jest
      .spyOn(useTypedFormHook, 'useTypedForm')
      .mockReturnValue({ ...useTypedForm(), TextField, Checkbox, Form })
  })
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AuthorizerForm {...props} />)
  })

  it('renders TextInput  with correct props', () => {
    render(<AuthorizerForm {...props} />)

    expect(TextField).toHaveBeenCalledWith(
      {
        label: 'Comment / Remarks',
        name: 'comment',
        variant: 'outlined',
        inputProps: {
          multiline: true
        }
      },
      {}
    )
  })

  it('renders Checkbox with correct props', () => {
    render(<AuthorizerForm {...props} />)

    expect(Checkbox).toHaveBeenCalledTimes(1)
    expect(Checkbox).toHaveBeenCalledWith(
      { label: 'Share this comment with the user', name: 'sharedWithUser' },
      {}
    )
  })

  it('renders Form with correct props', () => {
    render(<AuthorizerForm {...props} />)

    expect(Form).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledWith(
      { defaultValues: props.defaultValues, children: expect.anything() },
      {}
    )
  })

  it('renders ApproveButton with correct props', () => {
    render(<AuthorizerForm {...props} />)

    expect(ApproveButton).toHaveBeenCalledTimes(1)
    expect(ApproveButton).toHaveBeenCalledWith({ itemId: props.itemId }, {})
  })

  it('renders RejectButton with correct props', () => {
    render(<AuthorizerForm {...props} />)

    expect(RejectButton).toHaveBeenCalledTimes(1)
    expect(RejectButton).toHaveBeenCalledWith({ itemId: props.itemId }, {})
  })
})
